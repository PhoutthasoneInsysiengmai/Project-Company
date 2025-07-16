import adminModel from "../models/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// POST /api/admin/login
export const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await adminModel.findOne({ username });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid username" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
