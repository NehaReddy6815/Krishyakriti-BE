import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "krishyakriti"
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log("DB error:", err);
  }
};

export default connectDB;
