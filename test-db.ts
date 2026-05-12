import { neon } from "@neondatabase/serverless";

// Bun automatically reads process.env.DATABASE_URL from your existing secrets
const sql = neon(process.env.DATABASE_URL!);

async function checkConnection() {
  const result = await sql`SELECT version()`;
  console.log("Neon Connection Active:", result[0].version);
}

checkConnection();
