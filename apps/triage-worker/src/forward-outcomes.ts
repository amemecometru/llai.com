import { Client } from 'pg';
import 'dotenv/config';
import { execSync } from 'node:child_process';

const pg = new Client({ connectionString: process.env.DATABASE_URL });

async function main() {
  await pg.connect();
  await pg.query("SET search_path TO llai");

  const pending = (await pg.query(`
    SELECT o.*, sm.event_name
    FROM outcomes o
    JOIN stripe_meters sm ON sm.id = o.stripe_meter_id_fk
    WHERE o.status IN ('pending','failed')
    ORDER BY o.occurred_at
    LIMIT 100
  `)).rows;

  for (const o of pending) {
    const cmd = `stripe post /v1/billing/meter_events ` +
      `-d event_name='${o.event_name}' ` +
      `-d identifier='${o.identifier}' ` +
      `-d timestamp=${Math.floor(new Date(o.occurred_at).getTime() / 1000)} ` +
      `-d "payload[stripe_customer_id]=${o.stripe_customer_id}" ` +
      `-d "payload[value]=${o.value}" 2>&1`;

    const stdout = execSync(cmd, { encoding: 'utf8' });
    const json: any = JSON.parse(stdout);
    const resOk = !json.error;

    await pg.query(`
      INSERT INTO stripe_meter_events
        (outcome_id, identifier, stripe_meter_id_fk, event_name,
         stripe_customer_id, value, timestamp, payload, request_id,
         response_status, response_body)
      VALUES ($1,$2,$3,$4,$5,$6,to_timestamp($7::bigint),$8,$9,$10,$11)
    `, [
      o.id, o.identifier, o.stripe_meter_id_fk, o.event_name,
      o.stripe_customer_id, o.value,
      Math.floor(new Date(o.occurred_at).getTime() / 1000),
      JSON.stringify({ payload: { stripe_customer_id: o.stripe_customer_id, value: o.value } }),
      'test',
      resOk ? 200 : 400, JSON.stringify(json)
    ]);

    if (resOk) {
      await pg.query(
        `UPDATE outcomes SET status='sent', sent_to_stripe_at=now(), stripe_response=$2 WHERE id=$1`,
        [o.id, JSON.stringify(json)]
      );
    } else {
      await pg.query(
        `UPDATE outcomes SET status='rejected', stripe_response=$2 WHERE id=$1`,
        [o.id, JSON.stringify(json)]
      );
    }
  }

  console.log({ forwarded: pending.length });
  await pg.end();
}

main().catch(e => { console.error(e); process.exit(1); });
