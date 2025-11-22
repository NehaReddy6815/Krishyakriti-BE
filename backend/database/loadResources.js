import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Resource from "../models/Resource.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadResources() {
  try {
    // ✅ Connect using .env file
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "krishyakriti",
    });
    console.log("✅ Connected to MongoDB");

    // Folder containing JSON files
    const dataDir = path.join(__dirname, "data");

    // All .json files inside /database/data
    const files = fs.readdirSync(dataDir).filter((file) => file.endsWith(".json"));

    // Clear previous entries
    await Resource.deleteMany({});
    console.log("🗑️  Cleared existing resources");

    // Insert each JSON file
    for (const file of files) {
      const filePath = path.join(dataDir, file);
      const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

      await Resource.create(jsonData);
      console.log(`✅ Loaded: ${jsonData.title || file}`);
    }

    console.log(`\n🎉 Successfully loaded ${files.length} resources`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error loading resources:", error);
    process.exit(1);
  }
}

loadResources();
