import express from "express";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// All Wishlist Routes Require Login
router.use(authMiddleware);

router.get("/", getWishlist);
router.post("/", addToWishlist);
router.delete("/:id", removeFromWishlist);

export default router;