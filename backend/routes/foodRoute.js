import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        file.filename = filename;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood)

export default foodRouter;