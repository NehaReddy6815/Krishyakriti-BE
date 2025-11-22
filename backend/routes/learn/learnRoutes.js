import express from "express";
import mongoose from "mongoose";
import {
  getMulticropping,
  getAgroforestry,
  getMarketInfo,
} from "../controllers/learnController.js";
import Resource from "../models/Resource.js";

const router = express.Router();

// Provide a root list for /api/learn
router.get("/", async (req, res) => {
  try {
    // If DB connected, return resources from DB, else return static list
    if (mongoose.connection.readyState === 1) {
      const items = await Resource.find({}, { title: 1, slug: 1, summary: 1 }).sort({ createdAt: -1 }).lean();
      return res.json(items);
    }

    // fallback static list
    return res.json([
      { id: 1, slug: "multicropping", title: "Multicropping", summary: "Growing two or more crops in the same field in a season." },
      { id: 2, slug: "agroforestry", title: "Agroforestry", summary: "Integrating trees with crops." },
      { id: 3, slug: "market", title: "Market Information", summary: "Sources and market information for crops." },
    ]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Dynamic slug: try DB first, fall back to static controllers
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    if (mongoose.connection.readyState === 1) {
      const item = await Resource.findOne({ slug }).lean();
      if (item) return res.json(item);
    }

    // fallback to existing controllers for known slugs
    if (slug === 'multicropping') return getMulticropping(req, res);
    if (slug === 'agroforestry') return getAgroforestry(req, res);
    if (slug === 'market') return getMarketInfo(req, res);

    return res.status(404).json({ message: 'Not found' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// These 3 match top cards on Learn.jsx
router.get("/multicropping", getMulticropping);
router.get("/agroforestry", getAgroforestry);
router.get("/market", getMarketInfo);

export default router;
