import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "apartmentsdb1",
  password: "12345678",
  port: 5432,
});

pool.on("connect", () => console.log("Connected to PostgreSQL"));
