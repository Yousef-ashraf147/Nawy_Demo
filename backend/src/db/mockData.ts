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
      name: "Tijan Maadi",
      unitNumber: "B-303",
      project: "Tijan",
      price: 2200000,
      description: "Spacious apartment with a great view of the city.",
      imageUrl: "https://images.bayut.eg/thumbnails/29402677-400x300.jpeg",
    },
    // ---------------- NEW MOCK DATA BELOW ----------------
    {
      name: "Madinaty B11 Premium",
      unitNumber: "M-412",
      project: "Madinaty",
      price: 1800000,
      description: "Bright apartment overlooking wide green areas.",
      imageUrl: "https://images.bayut.eg/thumbnails/32483470-400x300.jpeg",
    },
    {
      name: "Sodic Eastown",
      unitNumber: "S-220",
      project: "Sodic",
      price: 3200000,
      description: "Modern unit with large terrace and high-end finishing.",
      imageUrl: "https://images.bayut.eg/thumbnails/31480756-400x300.jpeg",
    },
    {
      name: "Lake View Residence",
      unitNumber: "L-140",
      project: "Lake View",
      price: 3400000,
      description: "Lake-front views with elegant interior design.",
      imageUrl: "https://images.bayut.eg/thumbnails/28890105-400x300.jpeg",
    },
    {
      name: "Hyde Park New Cairo",
      unitNumber: "H-512",
      project: "Hyde Park",
      price: 2700000,
      description: "Cozy apartment near the central park with open views.",
      imageUrl: "https://images.bayut.eg/thumbnails/27201659-400x300.jpeg",
    },
    {
      name: "The Waterway",
      unitNumber: "W-101",
      project: "Waterway",
      price: 5500000,
      description: "Premium unit in one of the most luxurious compounds.",
      imageUrl: "https://images.bayut.eg/thumbnails/32529095-400x300.jpeg",
    },
    {
      name: "Villette Sodic",
      unitNumber: "V-330",
      project: "Sodic",
      price: 3600000,
      description: "Elegant minimalist apartment with private garden access.",
      imageUrl: "https://images.bayut.eg/thumbnails/32155606-400x300.jpeg",
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
