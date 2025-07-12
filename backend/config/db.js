import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://PunUpToGit:WebPun789@cluster0.3emngy8.mongodb.net/pun-up-to-github').then(() => console.log("DB Connected"));
}