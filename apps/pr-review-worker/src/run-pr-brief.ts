import { Client } from 'pg';
import Anthropic from '@anthropic-ai/sdk';
import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import 'dotenv/config';

const ORG_SLUG  = process.env.ORG_SLUG || 'test-co';
const USER_EMAIL = process.env.USER_EMAIL || 'test@logiclemonai.com';
const TILE_SLUG = 'pr-review-brief';

const pg = new Client({ connectionString: process.env.DATABASE_URL });
const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const composio = (cmd: string) =>
  JSON.parse(execSync(`composio ${cmd}`, { encoding: 'utf8' }));

async function main() {
  await pg.connect();
  await pg.query("SET search_path TO llai");

  const ctx = (await pg.query(`
    SELECT o.id AS org_id, u.id AS user_id, t.id AS tile_id,
           sm.id AS stripe_meter_id, sm.meter_slug
    FROM orgs o
    JOIN org_members om ON om.org_id = o.id
    JOIN users u ON u.id = om.user_id
    JOIN stripe_customers sc ON sc.org_id = o.id
    JOIN tiles t ON t.slug = $3
    JOIN tile_meters tm ON tm.tile_id = t.id
    JOIN stripe_meters sm ON sm.event_name = tm.meter_slug
    WHERE o.slug = $1 AND u.email = $2 AND tm.meter_slug = 'pr_brief_generated'
    LIMIT 1
  `, [ORG_SLUG, USER_EMAIL, TILE_SLUG])).rows[0];

  const run = (await pg.query(`
    INSERT INTO tile_runs (org_id, user_id, tile_id, trigger, input, status)
    VALUES ($1, $2, $3, 'manual', '{"owner":"amemecometru","repo":"llai.com"}', 'running')
    RETURNING id
  `, [ctx.org_id, ctx.user_id, ctx.tile_id])).rows[0];

  // Fetch PRs
  const prs = composio(`execute GITHUB_LIST_PULL_REQUESTS -d '{"owner":"amemecometru","repo":"llai.com","state":"open"}'`);
  
  const briefs = [];
  for (const pr of prs.data?.slice(0,5) || []) {
    const files = composio(`execute GITHUB_LIST_PULL_REQUEST_FILES -d '{"owner":"amemecometru","repo":"llai.com","pull_number":${pr.number}}'`);
    const reviews = composio(`execute GITHUB_LIST_PULL_REQUEST_REVIEWS -d '{"owner":"amemecometru","repo":"llai.com","pull_number":${pr.number}}'`);

    const brief = await claude.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 300,
      messages: [{ role: 'user', content: `Generate a PR review brief:
PR: ${pr.title} (#${pr.number})
Files: ${JSON.stringify(files.data?.map(f => f.filename))}
Reviews: ${JSON.stringify(reviews.data?.map(r => r.state))}
Format: "Brief: ... Key changes: ... Review status: ..."` }]
    });

    const text = (brief.content[0] as any).text;
    briefs.push({ pr: pr.number, brief: text });
  }

  await pg.query('BEGIN');
  for (const b of briefs) {
    const ev = (await pg.query(`
      INSERT INTO usage_events (org_id, tile_run_id, event_type, payload)
      VALUES ($1, $2, 'brief_generated', $3)
      RETURNING id
    `, [ctx.org_id, run.id, { pr: b.pr, brief: b.brief }])).rows[0];

    const identifier = createHash('sha256').update(`pr_brief_generated:${ev.id}`).digest('hex');
    
    await pg.query(`
      INSERT INTO outcomes (org_id, tile_run_id, tile_id, meter_slug, stripe_meter_id_fk,
        stripe_customer_id, identifier, value, occurred_at, status, source_event_ids, evidence)
      VALUES ($1,$2,$3,'pr_brief_generated',$4,
        (SELECT stripe_customer_id FROM stripe_customers WHERE org_id=$1),
        $5,1,now(),'pending',$6,$7)
      ON CONFLICT (identifier) DO NOTHING
    `, [ctx.org_id, run.id, ctx.tile_id, ctx.stripe_meter_id,
        identifier, [ev.id], { brief: b.brief }]);
  }
  await pg.query('COMMIT');

  await pg.query(`UPDATE tile_runs SET status='succeeded', completed_at=now() WHERE id=$1`, [run.id]);
  console.log(JSON.stringify({ run_id: run.id, briefs: briefs.length }, null, 2));
  await pg.end();
}

main().catch(e => { console.error(e); process.exit(1); });
