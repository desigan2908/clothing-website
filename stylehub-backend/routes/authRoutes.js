import express from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ==========================
   Public Routes
========================== */

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

/* ==========================
   Protected Routes
========================== */

// Get Logged-in User
router.get("/profile", authMiddleware, getProfile);

// Update Logged-in User
router.put("/profile", authMiddleware, updateProfile);

export default router;