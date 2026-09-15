import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ConnectDB from "./src/utility/db.js";
import userRouter from "./src/routes/api.js";
import newsRouter from "./src/routes/newsApi.js";
import rateLimit from "express-rate-limit";

// Load Environment Variables
dotenv.config();
const app = express();

//middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", 
    credentials: true, 
  }),
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 3000, // Limit each IP to 3000 requests per window
});
app.use(limiter);
app.use(async (req, res, next) => {
  try {
    await ConnectDB();
    next();
  } catch (err) {
    console.error("Database connection failed in middleware:", err);
    res.status(500).json({ error: "Database Connection Failed" });
  }
});
//routes
app.use("/api/v1", userRouter);
app.use("/api/v1", newsRouter);

//router health check
// Health check
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Default Route for Undefined Routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
