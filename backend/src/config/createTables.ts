import { pool } from "./database";

export async function ensureTablesExist() {
  const query = `
    CREATE TABLE IF NOT EXISTS apartments (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      unitNumber VARCHAR(255) NOT NULL,
      project VARCHAR(255) NOT NULL,
      price INTEGER NOT NULL,
      description TEXT
    );
  `;

  try {
    await pool.query(query);
    console.log("Apartments table verified/created.");
  } catch (err) {
    console.error("Error creating apartments table:", err);
    throw err;
  }
}
