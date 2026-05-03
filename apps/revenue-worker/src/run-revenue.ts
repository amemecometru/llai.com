import { Client } from 'pg';
import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import 'dotenv/config';

const ORG_SLUG  = process.env.ORG_SLUG || 'test-co';
const USER_EMAIL = process.env.USER_EMAIL || 'test@logiclemonai.com';
const TILE_SLUG = 'revenue-pulse';

const pg = new Client({ connectionString: process.env.DATABASE_URL });

const stripe = (cmd: string) =>
  JSON.parse(execSync(`stripe ${cmd}`, { encoding: 'utf8' }));

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
    WHERE o.slug = $1 AND u.email = $2 AND tm.meter_slug = 'revenue_report_viewed'
    LIMIT 1
  `, [ORG_SLUG, USER_EMAIL, TILE_SLUG])).rows[0];

  const run = (await pg.query(`
    INSERT INTO tile_runs (org_id, user_id, tile_id, trigger, input, status)
    VALUES ($1, $2, $3, 'manual', '{"type":"monthly"}', 'running')
    RETURNING id
  `, [ctx.org_id, ctx.user_id, ctx.tile_id])).rows[0];

  // Fetch Stripe revenue data
  const subs = stripe(`get /v1/subscriptions -d customer=$(stripe get /v1/customers search -d query="email:'test@logiclemonai.com'" | jq -r '.data[0].id')`);
  const invoices = stripe(`get /v1/invoices -d customer=$(stripe get /v1/customers search -d query="email:'test@logiclemonai.com'" | jq -r '.data[0].id') -d limit=12`);

  const report = {
    subscription: subs.data?.[0]?.status,
    monthly_revenue: subs.data?.[0]?.items?.data?.[0]?.price?.unit_amount_decimal / 100 || 0,
    invoices_last_12m: invoices.data?.length || 0,
    total_paid: invoices.data?.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount_paid, 0) / 100 || 0
  };

  await pg.query('BEGIN');
  const ev = (await pg.query(`
    INSERT INTO usage_events (org_id, tile_run_id, event_type, payload)
    VALUES ($1, $2, 'report_viewed', $3)
    RETURNING id
  `, [ctx.org_id, run.id, report])).rows[0];

  const identifier = createHash('sha256').update(`revenue_report_viewed:${ev.id}`).digest('hex');

  await pg.query(`
    INSERT INTO outcomes (org_id, tile_run_id, tile_id, meter_slug, stripe_meter_id_fk,
      stripe_customer_id, identifier, value, occurred_at, status, source_event_ids, evidence)
    VALUES ($1,$2,$3,'revenue_report_viewed',$4,
      (SELECT stripe_customer_id FROM stripe_customers WHERE org_id=$1),
      $5,1,now(),'pending',$6,$7)
    ON CONFLICT (identifier) DO NOTHING
  `, [ctx.org_id, run.id, ctx.tile_id, ctx.stripe_meter_id,
      identifier, [ev.id], report]);
  await pg.query('COMMIT');

  await pg.query(`UPDATE tile_runs SET status='succeeded', completed_at=now() WHERE id=$1`, [run.id]);
  console.log(JSON.stringify({ run_id: run.id, report }, null, 2));
  await pg.end();
}

main().catch(e => { console.error(e); process.exit(1); });
