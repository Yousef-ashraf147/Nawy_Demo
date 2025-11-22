import { Request, Response } from "express";
import { pool } from "../config/database";
import { Apartment } from "../models/Apartment";
import { handleError } from "../utils/errorHandler";

export const getApartments = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM apartments");
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
    const { name, unitnumber, project, price, description } = req.body;

    // Multer image
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "Image is required" });
    }

    // URL stored in DB
    const imageurl = `${process.env.BASE_URL || "http://localhost:5000"}/uploads/${file.filename}`;

    const result = await pool.query(
      `INSERT INTO apartments (name, unitnumber, project, price, description, imageurl)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [name, unitnumber, project, price, description, imageurl]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Add Apartment Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
