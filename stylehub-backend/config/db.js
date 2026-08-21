import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MONGO_URI is missing from .env");
    }

    console.log("🔗 MongoDB URI found");
    console.log("🔄 Connecting to MongoDB Atlas...");

    const conn = await mongoose.connect(mongoURI, {
      family: 4,
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
      socketTimeoutMS: 45000,
    });

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("✅ MongoDB Connected Successfully");
    console.log(`📍 Host     : ${conn.connection.host}`);
    console.log(`📂 Database : ${conn.connection.name}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    return conn;

  } catch (error) {
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.error("❌ MongoDB Connection Failed");
    console.error("Error:", error.message);
    console.error("Code:", error.code || "N/A");
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    throw error;
  }
};

export default connectDB;