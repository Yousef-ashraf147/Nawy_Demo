// backend/src/db/createDatabase.ts
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export async function ensureDatabaseExists() {
  const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: "postgres", // Always connect to default DB first
  });

  await client.connect();

  const dbName = process.env.DB_NAME!;

  const result = await client.query(
    `SELECT 1 FROM pg_database WHERE datname = $1`,
    [dbName]
  );

  if (result.rowCount === 0) {
    console.log(`Database ${dbName} does not exist. Creating...`);
    await client.query(`CREATE DATABASE ${dbName};`);
    console.log("Database created!");
  } else {
    console.log(`Database ${dbName} already exists.`);
  }

  await client.end();
}
