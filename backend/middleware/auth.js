import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
    }

    const token = authHeader.split(" ")[1]; // ตัดเอาแค่ token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id; // ส่งต่อไป controller
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);

        let message = "Invalid token";
        if (error.name === "TokenExpiredError") {
            message = "Token expired";
        } else if (error.name === "JsonWebTokenError") {
            message = "Invalid token signature";
        }

        return res.status(401).json({
            success: false,
            message
        });
    }
};
export default authMiddleware;