import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import {
    addHotel,
    getAllHotels,
    getHotelById,
    updateHotel,
    deleteHotel,
} from "../controllers/hotelController.js";
import {
    authenticateToken,
    requireAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDirectory = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },

    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1e9);

        const extension = path.extname(file.originalname).toLowerCase();

        cb(null, uniqueName + extension);
    },
});

const fileFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();

    const validExtension = allowedExtensions.includes(extension);
    const validMimeType = allowedMimeTypes.includes(file.mimetype);

    if (validExtension && validMimeType) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Invalid image format. Only JPG, JPEG, PNG and WEBP images are allowed."
            )
        );
    }
};

const upload = multer({
    storage,
    fileFilter,

    limits: {
        fileSize: 2 * 1024 * 1024,
        files: 1,
    },
});

const uploadImage = (req, res, next) => {
    upload.single("image")(req, res, (error) => {
        if (error) {
            if (error instanceof multer.MulterError) {
                if (error.code === "LIMIT_FILE_SIZE") {
                    return res.status(400).json({
                        success: false,
                        message: "Image size must not exceed 2 MB.",
                    });
                }

                if (error.code === "LIMIT_FILE_COUNT") {
                    return res.status(400).json({
                        success: false,
                        message: "Only one image can be uploaded.",
                    });
                }

                return res.status(400).json({
                    success: false,
                    message: error.message,
                });
            }

            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        next();
    });
};

// Admin only: Add hotel
router.post(
    "/",
    authenticateToken,
    requireAdmin,
    uploadImage,
    addHotel
);

// Public: View all hotels
router.get("/", getAllHotels);

// Public: View individual hotel details
router.get("/:id", getHotelById);

// Admin only: Update hotel
router.put(
    "/:id",
    authenticateToken,
    requireAdmin,
    uploadImage,
    updateHotel
);

// Admin only: Delete hotel
router.delete(
    "/:id",
    authenticateToken,
    requireAdmin,
    deleteHotel
);

export default router;


