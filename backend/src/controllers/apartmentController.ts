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

export const addApartment = async (req: Request, res: Response) => {
  try {
    const { name, unitNumber, project, price, description } = req.body;
    const result = await pool.query(
      "INSERT INTO apartments (name, unitNumber, project, price, description) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [name, unitNumber, project, price, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: unknown) {
    return res.status(500).json({ error: handleError(err) });
  }
};
