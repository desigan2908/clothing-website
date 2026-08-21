import dns from "dns";
import mongoose from "mongoose";
import dotenv from "dotenv";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

console.log("================================");
console.log("Testing MongoDB Atlas...");
console.log("================================");

console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
    console.log("❌ MONGO_URI is missing from .env");
    process.exit(1);
}

try {
    console.log("\n🔄 Connecting to MongoDB Atlas...");

    await mongoose.connect(process.env.MONGO_URI, {
        family: 4,
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
    });

    console.log("\n================================");
    console.log("✅ MONGODB CONNECTION SUCCESS");
    console.log("================================");
    console.log("Host:", mongoose.connection.host);
    console.log("Database:", mongoose.connection.name);
    console.log("Ready State:", mongoose.connection.readyState);
    console.log("================================");

    await mongoose.disconnect();

    console.log("✅ MongoDB connection closed.");
} catch (error) {
    console.log("\n================================");
    console.log("❌ MONGODB CONNECTION FAILED");
    console.log("================================");

    console.log("Name:", error.name);
    console.log("Code:", error.code);
    console.log("Message:", error.message);

    console.log("\n========== REASON ==========");
    console.log(error.reason);

    console.log("\n========== SERVERS ==========");

    if (error.reason?.servers) {
        for (const [server, details] of error.reason.servers) {
            console.log("\nServer:", server);
            console.log("Type:", details.type);
            console.log("Error:", details.error);

            if (details.error) {
                console.log("Error Name:", details.error.name);
                console.log("Error Message:", details.error.message);
                console.log("Error Code:", details.error.code);
            }
        }
    }

    console.log("\n========== FULL ERROR ==========");
    console.dir(error, { depth: 10 });

    console.log("================================");

    process.exit(1);
}