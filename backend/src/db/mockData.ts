import { pool } from "../config/database";

export async function seedMockData() {
  await pool.query("DELETE FROM apartments");
  // Optional: Reset the primary key sequence if you have one
  await pool.query("ALTER SEQUENCE apartments_id_seq RESTART WITH 1");

  const apartments = [
    {
      name: "Palm Hills Residence",
      unitNumber: "A-101",
      project: "Palm Hills",
      price: 2500000,
      description: "A luxurious apartment with modern finishing.",
      imageUrl:
        "https://newcairo-developments.com/wp-content/uploads/2024/03/apartments-For-sale-in-Palm-Hills-Fifth-Settlement.jpg",
    },
    {
      name: "Mountain View iCity",
      unitNumber: "C-202",
      project: "Mountain View",
      price: 1900000,
      description: "Beautiful apartment inside a premium gated community.",
      imageUrl:
        "https://selecthouse.co/wp-content/uploads/2022/07/Palm-Hills-New-Cairo.webp",
    },
    {
      name: "Tijan New Cairo",
      unitNumber: "B-303",
      project: "Tijan",
      price: 2200000,
      description: "Spacious apartment with a great view of the city.",
      imageUrl: "https://images.bayut.eg/thumbnails/29402677-400x300.jpeg",
    },
  ];

  for (const apt of apartments) {
    await pool.query(
      `INSERT INTO apartments (name, unitNumber, project, price, description, imageUrl)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [
        apt.name,
        apt.unitNumber,
        apt.project,
        apt.price,
        apt.description,
        apt.imageUrl,
      ]
    );
  }

  console.log("Mock data inserted!");
}
