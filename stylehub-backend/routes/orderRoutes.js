import express from "express";

import {
  placeOrder,
  getMyOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/orderController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// All Routes Require Login
router.use(authMiddleware);

// Place Order
router.post("/", placeOrder);

// Get All Orders of Logged-in User
router.get("/", getMyOrders);

// Get Single Order
router.get("/:id", getOrder);

// Update Order Status
router.put("/:id", updateOrderStatus);

// Cancel Order
router.delete("/:id", cancelOrder);

export default router;