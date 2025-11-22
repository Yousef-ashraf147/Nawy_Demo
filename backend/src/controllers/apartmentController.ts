import { Request, Response } from "express";
import { pool } from "../config/database";
import { handleError } from "../utils/errorHandler";

export const getApartments = async (req: Request, res: Response) => {
  try {
    // Always return newest first (useful for UI)
    const result = await pool.query(
      "SELECT * FROM apartments ORDER BY date_posted DESC"
    );
    res.json(result.rows);
  } catch (err: unknown) {
    return res.status(500).json({ error: handleError(err) });
  }
};

export const getApartmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM apartments WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Apartment not found" });
    }

    res.json(result.rows[0]);
  } catch (err: unknown) {
    return res.status(500).json({ error: handleError(err) });
  }
};

export const addApartment = async (req: Request, res: Response) => {
  try {
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
      date_posted, // optional
    } = req.body;

    // Ensure numeric fields are numbers
    const parsedPrice = Number(price);
    const parsedBedrooms = Number(bedrooms);
    const parsedBathrooms = Number(bathrooms);
    const parsedArea = Number(area);

    // Validate required image
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const imageurl = `${process.env.BASE_URL || "http://localhost:5000"}/uploads/${file.filename}`;

    // If no date provided → use NOW()
    const finalDatePosted = date_posted || new Date().toISOString();

    const result = await pool.query(
      `
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
      RETURNING *
      `,
      [
        name,
        unitnumber,
        project,
        parsedPrice,
        description,
        imageurl,
        parsedBedrooms,
        parsedBathrooms,
        parsedArea,
        location,
        finalDatePosted,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Add Apartment Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
