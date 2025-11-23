import express from "express";
import cors from "cors";
import apartmentRoutes from "./routes/apartmentsRoutes";
import { ensureDatabaseExists } from "./db/createDatabase";
import { ensureTablesExist } from "./db/createTables";
import { seedMockData } from "./db/mockData";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

// Serve images correctly
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Mount API routes
app.use("/api/apartments", apartmentRoutes);

// Run DB creation, table creation, and seeding BEFORE starting the server
async function startServer() {
  try {
    console.log("Ensuring database exists...");
    await ensureDatabaseExists();

    console.log("Ensuring tables exist...");
    await ensureTablesExist();

    console.log("Seeding mock data...");
    await seedMockData();

    app.listen(5000, () => console.log(" Backend running on port 5000"));
  } catch (error) {
    console.error(" Error starting backend:", error);
    process.exit(1);
  }
}

startServer();
