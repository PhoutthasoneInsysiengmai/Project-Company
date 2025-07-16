import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // เก็บเป็น bcrypt hash เท่านั้น!
});

const adminModel = mongoose.models.admin || mongoose.model("admin", adminSchema);
export default adminModel;
