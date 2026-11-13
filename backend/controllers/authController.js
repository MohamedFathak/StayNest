import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const isValidEmail = (email) => {
    const emailRegex =
        /^[A-Za-z0-9._%+-]+@[A-Za-z][A-Za-z0-9-]*(?:\.[A-Za-z]{2,})+$/;
    return emailRegex.test(email);
};
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            !name.trim() ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must contain at least 8 characters",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        if (!isValidEmail(normalizedEmail)) {
            return res.status(400).json({
                message: "Please enter a valid email address.",
            });
        }

        const existingUser = await db.query(
            "SELECT id FROM users WHERE email = $1",
            [normalizedEmail]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                message: "Email is already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.query(
            `INSERT INTO users (name, email, password, role)
             VALUES ($1, $2, $3, 'user')
             RETURNING id, name, email, role, created_at`,
            [name.trim(), normalizedEmail, hashedPassword]
        );

        return res.status(201).json({
            message: "Registration successful",
            user: result.rows[0],
        });

    } catch (error) {
        console.error("Registration error:", error);

        return res.status(500).json({
            message: "Server error during registration",
        });
    }
};
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        if (!isValidEmail(normalizedEmail)) {
            return res.status(400).json({
                message: "Please enter a valid email address.",
            });
        }

        const result = await db.query(
            "SELECT * FROM users WHERE email = $1",
            [normalizedEmail]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not configured");
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Server error during login",
        });
    }
};

// Create the first Admin account
export const createAdmin = async (req, res) => {
    let client;

    try {
        const { name, email, password } = req.body;
        const setupKey = req.headers["x-admin-setup-key"];

        if (
            !process.env.ADMIN_SETUP_KEY ||
            setupKey !== process.env.ADMIN_SETUP_KEY
        ) {
            return res.status(403).json({
                message: "Invalid Admin setup key",
            });
        }

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            !name.trim() ||
            !email.trim() ||
            password.length < 8
        ) {
            return res.status(400).json({
                message: "Valid name, email and password are required. Password must contain at least 8 characters.",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        if (!isValidEmail(normalizedEmail)) {
            return res.status(400).json({
                message: "Please enter a valid email address.",
            });
        }

        client = await db.connect();

        await client.query("BEGIN");

        // Prevent simultaneous requests from creating multiple Admins
        await client.query(
            "SELECT pg_advisory_xact_lock($1)",
            [746281]
        );

        const existingAdmin = await client.query(
            "SELECT id FROM users WHERE role = 'admin' LIMIT 1"
        );

        if (existingAdmin.rows.length > 0) {
            await client.query("ROLLBACK");

            return res.status(409).json({
                message: "An Admin account already exists",
            });
        }

        const existingUser = await client.query(
            "SELECT id FROM users WHERE email = $1",
            [normalizedEmail]
        );

        if (existingUser.rows.length > 0) {
            await client.query("ROLLBACK");

            return res.status(409).json({
                message: "Email is already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await client.query(
            `INSERT INTO users (name, email, password, role)
             VALUES ($1, $2, $3, 'admin')
             RETURNING id, name, email, role, created_at`,
            [name.trim(), normalizedEmail, hashedPassword]
        );

        await client.query("COMMIT");

        return res.status(201).json({
            message: "Admin account created successfully",
            user: result.rows[0],
        });

    } catch (error) {
        if (client) {
            await client.query("ROLLBACK").catch(() => {});
        }

        console.error("Admin creation error:", error);

        return res.status(500).json({
            message: "Server error during Admin creation",
        });

    } finally {
        client?.release();
    }
};



