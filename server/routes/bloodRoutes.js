import express from "express";

import {
  addBlood,
  useBlood,
  getInventory,
  lowStockAlert,
} from "../controllers/bloodController.js";

const router = express.Router();

router.post("/add", addBlood);

router.post("/use", useBlood);

router.get("/inventory", getInventory);

router.get("/low-stock", lowStockAlert);

export default router;
