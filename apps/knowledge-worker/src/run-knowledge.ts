import { Client } from 'pg';
import Anthropic from '@anthropic-ai/sdk';
import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import 'dotenv/config';

const ORG_SLUG  = process.env.ORG_SLUG || 'test-co';
const USER_EMAIL = process.env.USER_EMAIL || 'test@logiclemonai.com';
const TILE_SLUG = 'knowledge-tender';

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
    WHERE o.slug = $1 AND u.email = $2 AND tm.meter_slug = 'knowledge_page_created'
    LIMIT 1
  `, [ORG_SLUG, USER_EMAIL, TILE_SLUG])).rows[0];

  const run = (await pg.query(`
    INSERT INTO tile_runs (org_id, user_id, tile_id, trigger, input, status)
    VALUES ($1, $2, $3, 'manual', '{"source":"notion"}', 'running')
    RETURNING id
  `, [ctx.org_id, ctx.user_id, ctx.tile_id])).rows[0];

  // Search Notion
  const pages = composio(`execute NOTION_LIST_PAGES -d '{"page_size":10}'`);
  
  for (const page of pages.data || []) {
    const content = composio(`execute NOTION_GET_PAGE -d '{"page_id":"${page.id}"}'`);
    
    const summary = await claude.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 300,
      messages: [{ role: 'user', content: `Summarize this Notion page for knowledge capture:
Title: ${page.properties?.title?.title?.[0]?.plain_text || 'Untitled'}
Content: ${JSON.stringify(content.data || {}).slice(0, 1000)}
Format: "Summary: ... Key topics: ..."` }]
    });

    const text = (summary.content[0] as any).text;
    
    await pg.query('BEGIN');
    const ev = (await pg.query(`
      INSERT INTO usage_events (org_id, tile_run_id, event_type, payload)
      VALUES ($1, $2, 'page_created', $3)
      RETURNING id
    `, [ctx.org_id, run.id, { page_id: page.id, summary: text }])).rows[0];

    const identifier = createHash('sha256').update(`knowledge_page_created:${ev.id}`).digest('hex');

    await pg.query(`
      INSERT INTO outcomes (org_id, tile_run_id, tile_id, meter_slug, stripe_meter_id_fk,
        stripe_customer_id, identifier, value, occurred_at, status, source_event_ids, evidence)
      VALUES ($1,$2,$3,'knowledge_page_created',$4,
        (SELECT stripe_customer_id FROM stripe_customers WHERE org_id=$1),
        $5,1,now(),'pending',$6,$7)
      ON CONFLICT (identifier) DO NOTHING
    `, [ctx.org_id, run.id, ctx.tile_id, ctx.stripe_meter_id,
        identifier, [ev.id], { summary: text }]);
    await pg.query('COMMIT');
  }

  await pg.query(`UPDATE tile_runs SET status='succeeded', completed_at=now() WHERE id=$1`, [run.id]);
  console.log(JSON.stringify({ run_id: run.id, pages: (pages.data || []).length }, null, 2));
  await pg.end();
}

main().catch(e => { console.error(e); process.exit(1); });
