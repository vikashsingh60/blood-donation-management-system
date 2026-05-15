import express from "express";

import {
  createRequest,
  getAllRequests,
  matchBlood
} from "../controllers/requestController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// ✅ CREATE BLOOD REQUEST
router.post(
  "/create",
  protect,
  createRequest
);


// ✅ GET ALL REQUESTS
router.get(
  "/all",
  protect,
  getAllRequests
);


// ✅ MATCH BLOOD DONORS
router.get(
  "/match/:bloodGroup",
  protect,
  matchBlood
);


// ✅ TEST ROUTE
router.get(
  "/test",
  (req, res) => {

    res.json({

      success: true,

      message: "Request Routes Working"

    });

  }
);

export default router;