import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import learnRoutes from "./routes/learn/learnRoutes.js";
import feedbackRoutes from "./routes/learn/feedbackRoutes.js";
import connectDB from "./database/db.js";
import mongoose from 'mongoose';
import Farmer from "./models/Farmer.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Attempt DB connection if MONGO_URI provided
const { MONGO_URI, PORT = 5000 } = process.env;
if (MONGO_URI) {
  connectDB(MONGO_URI);
} else {
  console.warn("MONGO_URI not set — running without database. Feedback will be saved locally.");
}

// ROUTES
app.use("/api/learn", learnRoutes);
app.use("/api/feedback", feedbackRoutes);
app.get("/farmers-count", async (req, res) => {
  const count = await Farmer.countDocuments();
  res.json({ total: count });
});


// DB status endpoint for quick health check
app.get('/api/dbstatus', (req, res) => {
  if (!process.env.MONGO_URI) return res.json({ ok: true, db: 'not configured' });
  const state = mongoose.connection.readyState;
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const map = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  res.json({ ok: true, db: map[state] || state });
});

app.get("/", (req, res) => {
  res.send("Backend running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
