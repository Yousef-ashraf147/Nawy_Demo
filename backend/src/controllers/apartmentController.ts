import { Request, Response } from "express";
import { handleError } from "../utils/errorHandler";
import {
  fetchAllApartments,
  fetchApartmentById,
  insertApartment,
} from "../services/apartmentsService";

export const getApartments = async (req: Request, res: Response) => {
  try {
    const apartments = await fetchAllApartments();
    res.json(apartments);
  } catch (err) {
    res.status(500).json({ error: handleError(err) });
  }
};

export const getApartmentById = async (req: Request, res: Response) => {
  try {
    const apartment = await fetchApartmentById(req.params.id);

    if (!apartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }

    res.json(apartment);
  } catch (err) {
    res.status(500).json({ error: handleError(err) });
  }
};

export const addApartment = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const BASE = process.env.BASE_URL || "http://localhost:5000";
    const imageUrl = `${BASE}/uploads/${req.file.filename}`;

    const newApartment = await insertApartment(req.body, imageUrl);

    res.status(201).json(newApartment);
  } catch (err) {
    console.error("Add Apartment Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
