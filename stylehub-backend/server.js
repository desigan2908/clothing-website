import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

/* ==========================
   ENVIRONMENT CHECK
========================== */

console.log("================================");
console.log("🔄 Starting StyleHub backend...");
console.log("================================");

console.log(
  "MONGO_URI found:",
  Boolean(process.env.MONGO_URI)
);

console.log(
  "JWT_SECRET found:",
  Boolean(process.env.JWT_SECRET)
);

console.log(
  "CLIENT_URL:",
  process.env.CLIENT_URL || "http://localhost:5173"
);

/* ==========================
   MIDDLEWARE
========================== */

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ==========================
   ROOT ROUTE
========================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 StyleHub Backend is Running",
    mongodb:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
    database: mongoose.connection.name || null,
  });
});

/* ==========================
   DATABASE TEST
========================== */

app.get("/test-db", (req, res) => {
  const connected =
    mongoose.connection.readyState === 1;

  res.status(connected ? 200 : 500).json({
    success: connected,
    message: connected
      ? "MongoDB Atlas is connected"
      : "MongoDB Atlas is not connected",
    database: mongoose.connection.name || null,
    host: mongoose.connection.host || null,
    readyState: mongoose.connection.readyState,
  });
});

/* ==========================
   API ROUTES
========================== */

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);

/* ==========================
   404
========================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route Not Found: ${req.method} ${req.originalUrl}`,
  });
});

/* ==========================
   GLOBAL ERROR HANDLER
========================== */

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message:
      err.message || "Internal Server Error",
  });
});

/* ==========================
   CONNECT DATABASE + START
========================== */

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error(
        "MONGO_URI is missing from .env"
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error(
        "JWT_SECRET is missing from .env"
      );
    }

    console.log("🔄 Connecting to MongoDB Atlas...");

    await mongoose.connect(
      process.env.MONGO_URI,
      {
        family: 4,
        serverSelectionTimeoutMS: 15000,
        connectTimeoutMS: 15000,
      }
    );

    console.log("================================");
    console.log("✅ MONGODB CONNECTION SUCCESS");
    console.log("================================");

    console.log(
      "Host:",
      mongoose.connection.host
    );

    console.log(
      "Database:",
      mongoose.connection.name
    );

    console.log(
      "Ready State:",
      mongoose.connection.readyState
    );

    app.listen(
      PORT,
      "0.0.0.0",
      () => {
        console.log("================================");
        console.log(
          `🚀 Server running on port ${PORT}`
        );
        console.log(
          `🌐 http://localhost:${PORT}`
        );
        console.log("================================");
      }
    );

  } catch (error) {
    console.error("================================");
    console.error(
      "❌ SERVER STARTUP FAILED"
    );
    console.error("================================");

    console.error("Name:", error.name);
    console.error("Code:", error.code);
    console.error(
      "Message:",
      error.message
    );

    process.exit(1);
  }
};

startServer();