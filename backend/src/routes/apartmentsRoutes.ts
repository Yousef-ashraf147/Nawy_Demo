import express from "express";
import {
  getApartments,
  addApartment,
} from "../controllers/apartmentController";

const router = express.Router();

router.get("/", getApartments);
router.post("/", addApartment);

export default router;
