import express from "express";
import cors from "cors";
import apartmentRoutes from "./routes/apartmentsRoutes";
import { seedMockData } from "./db/mockData";
import { ensureDatabaseExists } from "./db/createDatabase";
import { ensureTablesExist } from "./db/createTables";
import path from "path";

const app = express();
app.use(cors());
app.use("/api/apartments", apartmentRoutes);

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

async function start() {
  await ensureTablesExist();
  await ensureDatabaseExists();
  await seedMockData();
  // then start express...
}

start();

app.listen(5000, () => console.log("Server running on port 5000"));
