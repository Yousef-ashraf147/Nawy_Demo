import { pool } from "../config/database";

export async function ensureTablesExist() {
  const query = `
    DROP TABLE IF EXISTS apartments;

    CREATE TABLE apartments (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      unitnumber VARCHAR(255) NOT NULL,
      project VARCHAR(255) NOT NULL,
      price INTEGER NOT NULL,
      description TEXT,
      imageurl TEXT NOT NULL,
      bedrooms INTEGER NOT NULL,
      bathrooms INTEGER NOT NULL,
      area INTEGER NOT NULL,
      location VARCHAR(255) NOT NULL,
      date_posted TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
    );
  `;

  try {
    await pool.query(query);
    console.log("Apartments table dropped and recreated.");
  } catch (err) {
    console.error("Error creating apartments table:", err);
    throw err;
  }
}
