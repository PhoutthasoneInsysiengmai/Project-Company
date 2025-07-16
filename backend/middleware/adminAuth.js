import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not Admin Role" });
    }

    req.adminId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export default adminAuth;
