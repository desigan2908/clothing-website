import express from "express";

import {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
} from "../controllers/cartController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// All Cart Routes Require Login
router.use(authMiddleware);

router.get("/", getCart);
router.post("/", addToCart);
router.put("/:id", updateCart);
router.delete("/:id", removeFromCart);

export default router;