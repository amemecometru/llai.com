// Junior agents: read every line. The deterministic identifier is critical —
// changing it will double-bill on retries. Don't.
import { Client } from 'pg';
import Anthropic from '@anthropic-ai/sdk';
import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import 'dotenv/config';

const ORG_SLUG  = 'test-co';
const USER_EMAIL = 'test@logiclemonai.com';
const TILE_SLUG = 'inbox-triage';

const pg = new Client({ connectionString: process.env.DATABASE_URL });
const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const composio = (cmd: string) =>
  JSON.parse(execSync(`composio ${cmd}`, { encoding: 'utf8' }));

async function main() {
  await pg.connect();
  await pg.query("SET search_path TO llai");

  // 1. Resolve org + user + customer + tile
  const ctx = (await pg.query(`
    SELECT o.id AS org_id, u.id AS user_id, t.id AS tile_id,
           sc.stripe_customer_id, sm.id AS stripe_meter_id_actionable
    FROM orgs o
    JOIN org_members om ON om.org_id = o.id
    JOIN users u ON u.id = om.user_id
    JOIN stripe_customers sc ON sc.org_id = o.id
    JOIN tiles t ON t.slug = $3
    JOIN stripe_meters sm ON sm.event_name = 'actionable_email_surfaced'
    WHERE o.slug = $1 AND u.email = $2
    LIMIT 1
  `, [ORG_SLUG, USER_EMAIL, TILE_SLUG])).rows[0];

  // 2. Open a tile_run
  const run = (await pg.query(`
    INSERT INTO tile_runs (org_id, user_id, tile_id, trigger, input, status)
    VALUES ($1, $2, $3, 'manual', '{"window":"24h"}', 'running')
    RETURNING id
  `, [ctx.org_id, ctx.user_id, ctx.tile_id])).rows[0];

  // 3. Fetch messages via Composio
  const result = JSON.parse(execSync(`composio execute GMAIL_FETCH_EMAILS -d '{"max_results":50,"ids_only":false}'`, { encoding: 'utf8' }));
  const outputPath = result.outputFilePath;
  const fetched = JSON.parse(readFileSync(outputPath, 'utf8'));
  const messages: any[] = fetched.data?.messages ?? [];

  // 4. Log raw event for every message scanned
  for (const m of messages) {
    const headers = m.payload?.headers ?? [];
    const subject = headers.find((h: any) => h.name === 'Subject')?.value ?? '';
    await pg.query(
      `INSERT INTO usage_events (org_id, tile_run_id, event_type, payload)
       VALUES ($1, $2, 'email_scanned', $3)`,
      [ctx.org_id, run.id, { gmail_id: m.id, subject }]
    );
  }

  // 5. Classify each message; mint outcomes for actionables
  for (const m of messages) {
    const headers = m.payload?.headers ?? [];
    const subject = headers.find((h: any) => h.name === 'Subject')?.value ?? '';
    const from = headers.find((h: any) => h.name === 'From')?.value ?? '';
    const snippet = m.snippet ?? '';
    
    const verdict = await classify({ subject, from, snippet });
    if (verdict.label !== 'actionable') {
      await pg.query(
        `INSERT INTO usage_events (org_id, tile_run_id, event_type, payload)
         VALUES ($1, $2, 'email_classified', $3)`,
        [ctx.org_id, run.id, { gmail_id: m.id, label: verdict.label }]
      );
      continue;
    }

    // Insert the classification event AND mint the outcome in one tx
    await pg.query('BEGIN');
    const ev = (await pg.query(
      `INSERT INTO usage_events (org_id, tile_run_id, event_type, payload)
       VALUES ($1, $2, 'email_classified', $3)
       RETURNING id`,
      [ctx.org_id, run.id, { gmail_id: m.id, label: 'actionable', reason: verdict.reason }]
    )).rows[0];

    const sourceIds = [ev.id];
    const identifier = createHash('sha256')
      .update('actionable_email_surfaced:' + sourceIds.sort().join(','))
      .digest('hex');

    await pg.query(`
      INSERT INTO outcomes (
        org_id, tile_run_id, tile_id, meter_slug, stripe_meter_id_fk,
        stripe_customer_id, identifier, value, occurred_at,
        status, source_event_ids, evidence
      ) VALUES ($1,$2,$3,'actionable_email_surfaced',$4,$5,$6,1,now(),'pending',$7,$8)
      ON CONFLICT (identifier) DO NOTHING
    `, [
      ctx.org_id, run.id, ctx.tile_id, ctx.stripe_meter_id_actionable,
      ctx.stripe_customer_id, identifier, sourceIds,
      { gmail_id: m.id, subject }
    ]);
    await pg.query('COMMIT');
  }

  await pg.query(
    `UPDATE tile_runs SET status='succeeded', completed_at=now() WHERE id=$1`,
    [run.id]
  );

  console.log(JSON.stringify({ run_id: run.id, scanned: messages.length }, null, 2));
  await pg.end();
}

async function classify(msg: { subject: string; from: string; snippet: string }): Promise<{ label: string; reason: string }> {
  const r = await claude.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 200,
    messages: [{
      role: 'user',
      content: `Classify this email as one of: actionable | newsletter | archive.\n` +
               `Reply ONLY as JSON: {"label":"...","reason":"..."}\n\n` +
               `Subject: ${msg.subject}\nFrom: ${msg.from}\n` +
               `Snippet: ${msg.snippet.slice(0, 500)}`
    }]
  });
  try {
    const txt = (r.content[0] as any).text.trim();
    return JSON.parse(txt.match(/\{[\s\S]+\}/)![0]);
  } catch { return { label: 'archive', reason: 'parse_failed' }; }
}

main().catch(e => { console.error(e); process.exit(1); });
