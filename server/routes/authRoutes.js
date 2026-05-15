import express from "express";
import { register, login, verifyOTP, requestOTP, resendOTP } from "../controllers/authController.js";

const router = express.Router();

// ✅ Normal Auth Routes
router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOTP);
router.post("/request-otp", requestOTP);
router.post("/resend-otp", resendOTP);

// ✅ Google OAuth - REMOVED as per requirements
// ✅ Facebook OAuth - REMOVED as per requirements
// ✅ LinkedIn OAuth - REMOVED as per requirements

export default router;
