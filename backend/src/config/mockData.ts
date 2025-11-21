import { pool } from "./database";

export async function seedMockData() {
  const count = await pool.query("SELECT COUNT(*) FROM apartments");

  if (Number(count.rows[0].count) > 0) {
    console.log("Mock data already exists, skipping seed.");
    return;
  }

  const apartments = [
    {
      name: "Palm Hills Residence",
      unitNumber: "A-101",
      project: "Palm Hills",
      price: 2500000,
      description: "A luxurious apartment with modern finishing.",
    },
    {
      name: "Mountain View iCity",
      unitNumber: "C-202",
      project: "Mountain View",
      price: 1900000,
      description: "Beautiful apartment inside a premium gated community.",
    },
  ];

  for (const apt of apartments) {
    await pool.query(
      `INSERT INTO apartments (name, unitNumber, project, price, description)
       VALUES ($1,$2,$3,$4,$5)`,
      [apt.name, apt.unitNumber, apt.project, apt.price, apt.description]
    );
  }

  console.log("Mock data inserted!");
}
