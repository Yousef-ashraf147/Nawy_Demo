import express from "express";
import cors from "cors";
import apartmentRoutes from "./routes/apartmentsRoutes";
import { seedMockData } from "./config/mockData";
import { ensureDatabaseExists } from "./config/createDatabase";
import { ensureTablesExist } from "./config/createTables";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/apartments", apartmentRoutes);

async function start() {
  await ensureTablesExist();
  await ensureDatabaseExists();
  await seedMockData();
  // then start express...
}

start();

app.listen(5000, () => console.log("Server running on port 5000"));
