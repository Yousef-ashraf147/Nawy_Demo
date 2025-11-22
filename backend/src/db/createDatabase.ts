import { Client } from "pg";

export async function ensureDatabaseExists() {
  const client = new Client({
    user: "postgres",
    password: "12345678",
    host: "localhost",
    port: 5432,
    database: "postgres", // connect to default DB first
  });

  await client.connect();

  const dbName = "apartmentsdb1";

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
