import mongoose from "mongoose";

let connectionPromise: Promise<typeof mongoose> | null = null;

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  if (!process.env.MONGO_URI) {
    console.warn("MongoDB connection skipped: MONGO_URI is not configured");
    return null;
  }

  try {
    connectionPromise = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    await connectionPromise;
    console.log("MongoDB connected successfully");
    return mongoose;
  } catch (err) {
    connectionPromise = null;
    console.error("MongoDB connection failed:", err);
    if (process.env.VERCEL !== "1" && process.env.VERCEL !== "true") {
      process.exit(1);
    }
    return null;
  }
};
