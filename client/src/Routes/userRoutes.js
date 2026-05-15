import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/find-donors", async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;

    const donors = await User.find({
      role: "donor",
      bloodGroup: bloodGroup || { $exists: true },
      city: city
        ? { $regex: city, $options: "i" }
        : { $exists: true }
    });

    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;