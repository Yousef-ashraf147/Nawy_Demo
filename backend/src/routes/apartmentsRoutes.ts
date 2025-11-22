import express from "express";
import {
  getApartments,
  addApartment,
  getApartmentById,
} from "../controllers/apartmentController";
import { upload } from "../middlewares/upload";

const router = express.Router();

router.post("/", upload.single("image"), addApartment);

router.get("/", getApartments);
router.get("/:id", getApartmentById);
// router.post("/", addApartment);
// router.post("/", upload.single("image"), addApartment);

export default router;
