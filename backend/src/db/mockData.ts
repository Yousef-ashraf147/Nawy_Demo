import { pool } from "../config/database";

export async function seedMockData() {
  await pool.query("DELETE FROM apartments");
  await pool.query("ALTER SEQUENCE apartments_id_seq RESTART WITH 1");

  const apartments = [
    {
      name: "Palm Hills Residence",
      unitnumber: "A-101",
      project: "Palm Hills",
      price: 2500000,
      description:
        "A luxurious apartment located inside Palm Hills, featuring modern finishing, large windows, natural sunlight, and access to premium community facilities including pools, gyms, and landscaped areas.",
      imageurl:
        "https://newcairo-developments.com/wp-content/uploads/2024/03/apartments-For-sale-in-Palm-Hills-Fifth-Settlement.jpg",
      bedrooms: 3,
      bathrooms: 2,
      area: 165,
      location: "Palm Hills, New Cairo",
      date_posted: "2025-11-22T09:00:00Z",
    },
    {
      name: "Mountain View iCity",
      unitnumber: "C-202",
      project: "Mountain View",
      price: 1900000,
      description:
        "A beautiful apartment in Mountain View iCity, offering spacious rooms, modern layout, and access to the Valley Park walking trails and lakes.",
      imageurl:
        "https://selecthouse.co/wp-content/uploads/2022/07/Palm-Hills-New-Cairo.webp",
      bedrooms: 2,
      bathrooms: 1,
      area: 145,
      location: "Mountain View iCity, New Cairo",
      date_posted: "2025-10-12T12:00:00Z",
    },
    {
      name: "Tijan Maadi",
      unitnumber: "B-303",
      project: "Tijan",
      price: 2200000,
      description:
        "Located in Tijan, this apartment features high-end finishing and a panoramic balcony overlooking green landscapes.",
      imageurl: "https://images.bayut.eg/thumbnails/29402677-400x300.jpeg",
      bedrooms: 3,
      bathrooms: 2,
      area: 175,
      location: "Tijan Compound, Maadi",
      date_posted: "2025-11-13T16:00:00Z",
    },
    {
      name: "Madinaty B11 Premium",
      unitnumber: "M-412",
      project: "Madinaty",
      price: 1800000,
      description:
        "Bright apartment overlooking wide green areas with spacious rooms and modern interior.",
      imageurl: "https://images.bayut.eg/thumbnails/32483470-400x300.jpeg",
      bedrooms: 2,
      bathrooms: 1,
      area: 140,
      location: "Madinaty, New Cairo",
      date_posted: "2025-11-22T14:00:00Z",
    },
    {
      name: "Sodic Eastown",
      unitnumber: "S-220",
      project: "Sodic",
      price: 3200000,
      description:
        "Modern apartment with large terrace, high-end finishing, and access to Eastown Hub.",
      imageurl: "https://images.bayut.eg/thumbnails/31480756-400x300.jpeg",
      bedrooms: 3,
      bathrooms: 2,
      area: 185,
      location: "Eastown, New Cairo",
      date_posted: "2025-11-05T10:00:00Z",
    },
    {
      name: "Lake View Residence",
      unitnumber: "L-140",
      project: "Lake View",
      price: 3400000,
      description:
        "Lake-front apartment with elegant interior, open layout, and premium community amenities.",
      imageurl: "https://images.bayut.eg/thumbnails/28890105-400x300.jpeg",
      bedrooms: 3,
      bathrooms: 3,
      area: 210,
      location: "Lake View, New Cairo",
      date_posted: "2025-11-12T11:00:00Z",
    },
    {
      name: "Hyde Park New Cairo",
      unitnumber: "H-512",
      project: "Hyde Park",
      price: 2700000,
      description:
        "Cozy apartment near the central park featuring natural lighting and modern finishing.",
      imageurl: "https://images.bayut.eg/thumbnails/27201659-400x300.jpeg",
      bedrooms: 2,
      bathrooms: 2,
      area: 160,
      location: "Hyde Park, New Cairo",
      date_posted: "2025-10-09T15:00:00Z",
    },
    {
      name: "The Waterway",
      unitnumber: "W-101",
      project: "Waterway",
      price: 5500000,
      description:
        "Premium unit in one of the most exclusive compounds with access to high-end amenities.",
      imageurl: "https://images.bayut.eg/thumbnails/32529095-400x300.jpeg",
      bedrooms: 4,
      bathrooms: 3,
      area: 250,
      location: "The Waterway, New Cairo",
      date_posted: "2025-11-14T17:00:00Z",
    },
    {
      name: "Villette Sodic",
      unitnumber: "V-330",
      project: "Sodic",
      price: 3600000,
      description:
        "Elegant minimalist apartment with premium finishing and private green views.",
      imageurl: "https://images.bayut.eg/thumbnails/32155606-400x300.jpeg",
      bedrooms: 3,
      bathrooms: 3,
      area: 200,
      location: "Villette, New Cairo",
      date_posted: "2025-11-11T11:00:00Z",
    },
  ];

  for (const apt of apartments) {
    await pool.query(
      `INSERT INTO apartments 
        (name, unitnumber, project, price, description, imageurl, bedrooms, bathrooms, area, location, date_posted)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      `,
      [
        apt.name,
        apt.unitnumber,
        apt.project,
        apt.price,
        apt.description,
        apt.imageurl,
        apt.bedrooms,
        apt.bathrooms,
        apt.area,
        apt.location,
        apt.date_posted,
      ]
    );
  }

  console.log("Mock data inserted!");
}
