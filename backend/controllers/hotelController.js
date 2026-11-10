
import { db } from "../config/db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Find the backend uploads folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDirectory = path.join(__dirname, "../uploads");

// Safely remove an image belonging to this application
const removeImageFile = async (imagePath) => {
    if (
        !imagePath ||
        typeof imagePath !== "string" ||
        !imagePath.startsWith("/uploads/")
    ) {
        return;
    }

    const filename = path.basename(imagePath);
    const filePath = path.join(uploadDirectory, filename);

    try {
        await fs.promises.unlink(filePath);
        console.log("Image deleted:", filename);
    } catch (error) {
        if (error.code !== "ENOENT") {
            console.error("Image cleanup error:", error.message);
        }
    }
};

// Remove a newly uploaded file if its database operation fails
const removeNewUpload = async (file) => {
    if (!file?.path) return;

    try {
        await fs.promises.unlink(file.path);
    } catch (error) {
        if (error.code !== "ENOENT") {
            console.error("New image cleanup error:", error.message);
        }
    }
};

// ADD HOTEL
export const addHotel = async (req, res) => {
    try {
        const {
            title,
            description,
            latitude,
            longitude,
            price,
        } = req.body;

        if (
            !title?.trim() ||
            !description?.trim() ||
            latitude === undefined ||
            longitude === undefined ||
            price === undefined
        ) {
            await removeNewUpload(req.file);

            return res.status(400).json({
                success: false,
                message: "Please fill in all hotel details.",
            });
        }

        const hotelLatitude = Number(latitude);
        const hotelLongitude = Number(longitude);
        const hotelPrice = Number(price);

        if (
            !Number.isFinite(hotelLatitude) ||
            hotelLatitude < -90 ||
            hotelLatitude > 90 ||
            !Number.isFinite(hotelLongitude) ||
            hotelLongitude < -180 ||
            hotelLongitude > 180 ||
            !Number.isFinite(hotelPrice) ||
            hotelPrice <= 0
        ) {
            await removeNewUpload(req.file);

            return res.status(400).json({
                success: false,
                message: "Please enter valid location and price details.",
            });
        }

        const imagePath = req.file
            ? `/uploads/${req.file.filename}`
            : null;

        const result = await db.query(
            `INSERT INTO hotels
            (title, description, latitude, longitude, price, image_path)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [
                title.trim(),
                description.trim(),
                hotelLatitude,
                hotelLongitude,
                hotelPrice,
                imagePath,
            ]
        );

        res.status(201).json({
            success: true,
            message: "Hotel added successfully.",
            hotel: result.rows[0],
        });
    } catch (error) {
        await removeNewUpload(req.file);

        console.error("Add hotel error:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to add hotel.",
        });
    }
};

// GET ALL HOTELS
export const getAllHotels = async (req, res) => {
    try {
        const {
            search = "",
            minPrice,
            maxPrice,
            page = 1,
            limit = 6,
        } = req.query;

        const currentPage = Math.max(1, Number(page) || 1);
        const pageSize = Math.min(100, Math.max(1, Number(limit) || 6));
        const offset = (currentPage - 1) * pageSize;

        const conditions = [];
        const values = [];

        if (search.trim()) {
            values.push(`%${search.trim()}%`);
            conditions.push(`title ILIKE $${values.length}`);
        }

        if (minPrice !== undefined && minPrice !== "") {
            const minimum = Number(minPrice);

            if (!Number.isFinite(minimum)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid minimum price.",
                });
            }

            values.push(minimum);
            conditions.push(`price >= $${values.length}`);
        }

        if (maxPrice !== undefined && maxPrice !== "") {
            const maximum = Number(maxPrice);

            if (!Number.isFinite(maximum)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid maximum price.",
                });
            }

            values.push(maximum);
            conditions.push(`price <= $${values.length}`);
        }

        const whereClause = conditions.length
            ? `WHERE ${conditions.join(" AND ")}`
            : "";

        const countResult = await db.query(
            `SELECT COUNT(*) FROM hotels ${whereClause}`,
            values
        );

        const totalHotels = Number(countResult.rows[0].count);

        const hotelResult = await db.query(
            `SELECT * FROM hotels
            ${whereClause}
            ORDER BY id DESC
            LIMIT $${values.length + 1}
            OFFSET $${values.length + 2}`,
            [...values, pageSize, offset]
        );

        res.status(200).json({
            success: true,
            totalHotels,
            currentPage,
            totalPages: Math.ceil(totalHotels / pageSize),
            hotels: hotelResult.rows,
        });
    } catch (error) {
        console.error("Get hotels error:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to retrieve hotels.",
        });
    }
};

// GET HOTEL BY ID
export const getHotelById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!/^\d+$/.test(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid hotel ID.",
            });
        }

        const result = await db.query(
            "SELECT * FROM hotels WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found.",
            });
        }

        res.status(200).json({
            success: true,
            hotel: result.rows[0],
        });
    } catch (error) {
        console.error("Get hotel error:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to retrieve hotel.",
        });
    }
};

// UPDATE HOTEL
export const updateHotel = async (req, res) => {
    try {
        const { id } = req.params;

        if (!/^\d+$/.test(id)) {
            await removeNewUpload(req.file);

            return res.status(400).json({
                success: false,
                message: "Invalid hotel ID.",
            });
        }

        const {
            title,
            description,
            latitude,
            longitude,
            price,
        } = req.body;

        if (
            !title?.trim() ||
            !description?.trim() ||
            latitude === undefined ||
            longitude === undefined ||
            price === undefined
        ) {
            await removeNewUpload(req.file);

            return res.status(400).json({
                success: false,
                message: "Please fill in all hotel details.",
            });
        }

        const hotelLatitude = Number(latitude);
        const hotelLongitude = Number(longitude);
        const hotelPrice = Number(price);

        if (
            !Number.isFinite(hotelLatitude) ||
            hotelLatitude < -90 ||
            hotelLatitude > 90 ||
            !Number.isFinite(hotelLongitude) ||
            hotelLongitude < -180 ||
            hotelLongitude > 180 ||
            !Number.isFinite(hotelPrice) ||
            hotelPrice <= 0
        ) {
            await removeNewUpload(req.file);

            return res.status(400).json({
                success: false,
                message: "Please enter valid location and price details.",
            });
        }

        // Get the previous image before updating
        const existingHotel = await db.query(
            "SELECT image_path FROM hotels WHERE id = $1",
            [id]
        );

        if (existingHotel.rows.length === 0) {
            await removeNewUpload(req.file);

            return res.status(404).json({
                success: false,
                message: "Hotel not found.",
            });
        }

        const oldImagePath = existingHotel.rows[0].image_path;

        const newImagePath = req.file
            ? `/uploads/${req.file.filename}`
            : null;

        const result = await db.query(
            `UPDATE hotels
            SET title = $1,
                description = $2,
                latitude = $3,
                longitude = $4,
                price = $5,
                image_path = COALESCE($6, image_path),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $7
            RETURNING *`,
            [
                title.trim(),
                description.trim(),
                hotelLatitude,
                hotelLongitude,
                hotelPrice,
                newImagePath,
                id,
            ]
        );

        // Delete the old image only after a successful database update
        if (req.file && oldImagePath) {
            await removeImageFile(oldImagePath);
        }

        res.status(200).json({
            success: true,
            message: "Hotel updated successfully.",
            hotel: result.rows[0],
        });
    } catch (error) {
        await removeNewUpload(req.file);

        console.error("Update hotel error:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to update hotel.",
        });
    }
};

// DELETE HOTEL
export const deleteHotel = async (req, res) => {
    try {
        const { id } = req.params;

        if (!/^\d+$/.test(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid hotel ID.",
            });
        }

        // Delete the database record and retrieve its image path
        const result = await db.query(
            "DELETE FROM hotels WHERE id = $1 RETURNING id, image_path",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found.",
            });
        }

        // Remove the associated image from the uploads folder
        await removeImageFile(result.rows[0].image_path);

        res.status(200).json({
            success: true,
            message: "Hotel and its image deleted successfully.",
        });
    } catch (error) {
        console.error("Delete hotel error:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to delete hotel.",
        });
    }
};
