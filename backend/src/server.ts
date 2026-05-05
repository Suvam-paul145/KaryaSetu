import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";

dotenv.config();
void connectDB();

const app = express();
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((origin) => origin.trim()).filter(Boolean)
  : true;

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

const apiRouter = express.Router();

// Test route
apiRouter.get('/test', (req, res) => {
  res.json({ message: 'Backend server is working!' });
});

// Routes
apiRouter.use("/auth", authRoutes);

// Health check for Vercel
apiRouter.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use("/api", apiRouter);
app.use("/_/backend/api", apiRouter);

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORT || 5000;
const isVercel = process.env.VERCEL === "1" || process.env.VERCEL === "true";

if (!isVercel) {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

export = app;
