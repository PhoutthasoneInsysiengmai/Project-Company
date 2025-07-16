import express from "express";
import { adminLogin } from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";
import orderModel from "../models/orderModel.js";

const router = express.Router();

router.post("/login", adminLogin);

// ตัวอย่าง Protected Admin Route
router.get("/orders", adminAuth, async (req, res) => {
  const orders = await orderModel.find();
  res.json({ success: true, data: orders });
});

export default router;
