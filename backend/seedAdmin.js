// backend/seedAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import adminModel from "./models/adminModel.js";
import { config } from "dotenv";

config(); // โหลด .env

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const hash = await bcrypt.hash("YourStrongPassword123", 10);

  await adminModel.create({
    username: "admin",
    password: hash,
  });

  console.log("✅ Admin Created!");
  process.exit(0);
};

createAdmin();
