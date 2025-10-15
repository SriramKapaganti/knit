import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
} from "../controllers/authControllers.js";
import { Protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// -------------------- Public Routes --------------------
// Register new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// -------------------- Protected Route --------------------
// Get logged-in user profile
router.get("/profile", Protect, getProfile);

// --Logout Route--
router.post("/logout", Protect, logoutUser);

export default router;
