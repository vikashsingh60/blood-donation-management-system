import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Admin dashboard access granted", user: req.user });
});

router.get("/hospital", protect, authorizeRoles("hospital"), (req, res) => {
  res.json({ message: "Hospital panel access granted", user: req.user });
});

router.get("/donor", protect, authorizeRoles("donor"), (req, res) => {
  res.json({ message: "Donor portal access granted", user: req.user });
});

router.get("/patient", protect, authorizeRoles("patient"), (req, res) => {
  res.json({ message: "Patient portal access granted", user: req.user });
});

export default router;
