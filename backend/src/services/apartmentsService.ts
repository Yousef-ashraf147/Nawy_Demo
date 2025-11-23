import { pool } from "../config/database";

export async function fetchAllApartments() {
  const result = await pool.query(
    "SELECT * FROM apartments ORDER BY date_posted DESC"
  );
  return result.rows;
}

export async function fetchApartmentById(id: string) {
  const result = await pool.query("SELECT * FROM apartments WHERE id = $1", [
    id,
  ]);

  return result.rows[0] || null;
}

export async function insertApartment(data: any, imageUrl: string) {
  const {
    name,
    unitnumber,
    project,
    price,
    description,
    bedrooms,
    bathrooms,
    area,
    location,
    date_posted,
  } = data;

  const parsedPrice = Number(price);
  const parsedBedrooms = Number(bedrooms);
  const parsedBathrooms = Number(bathrooms);
  const parsedArea = Number(area);

  const finalDatePosted = date_posted || new Date().toISOString();

  const query = `
      INSERT INTO apartments (
        name,
        unitnumber,
        project,
        price,
        description,
        imageurl,
        bedrooms,
        bathrooms,
        area,
        location,
        date_posted
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *;
  `;

  const values = [
    name,
    unitnumber,
    project,
    parsedPrice,
    description,
    imageUrl,
    parsedBedrooms,
    parsedBathrooms,
    parsedArea,
    location,
    finalDatePosted,
  ];

  console.log("Entered servicee layer");
  const result = await pool.query(query, values);
  return result.rows[0];
}
