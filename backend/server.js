
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "./config/db.js";
import hotelRoutes from "./routers/hotelRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());
const currentFile = fileURLToPath(import.meta.url);
const currentFolder = path.dirname(currentFile);
app.use(
    "/uploads",
    express.static(path.join(currentFolder, "uploads"))
);
app.use("/api/hotels", hotelRoutes);
app.get("/", (req, res) => {
    res.send("StayNest Backend is running!");
});
app.get("/api/db-test", async (req, res) => {
    try {
        const result = await db.query("SELECT NOW()");

        res.status(200).json({
            success: true,
            message: "PostgreSQL connected successfully!",
            databaseTime: result.rows[0].now,
        });
    } catch (error) {
        console.error("Database connection error:", error.message);

        res.status(500).json({
            success: false,
            message: "Database connection failed",
        });
    }
});
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await db.query("SELECT 1");

        console.log("PostgreSQL connected successfully!");

        app.listen(PORT, () => {
            console.log(`StayNest backend running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
};

startServer();


