import { config } from "dotenv";
config();
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const connectMongoDB = async () => {
  return new Promise<void>((resolve, reject) => {
    if (!MONGODB_URI) throw new Error("[mongoose] mongodb uri not found.");

    mongoose
      .connect(MONGODB_URI)
      .then(() => {
        console.log("[mongoose] connected successfully");
        resolve();
      })
      .catch((error) => {
        console.error("[mongoose] connection error : ", error);
        reject();
      });
  });
};
