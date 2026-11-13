import jwt from "jsonwebtoken";
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            message: "Access denied. Please log in.",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(403).json({
            message: "Invalid or expired token",
        });
    }
};
// Allow only Admin users
export const requireAdmin = (req, res, next) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({
            message: "Access denied. Admin permission required.",
        });
    }
    next();
};
