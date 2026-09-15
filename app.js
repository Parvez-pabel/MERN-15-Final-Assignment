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
app.use(cors());
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
app.get("/api/v1/health", (req, res) => {
  const healthcheck = {
    status: "OK",
    uptime: process.uptime(), // seconds the server has been running
    timestamp: new Date().toISOString(),
  };

  try {
    res.status(200).json(healthcheck);
  } catch (error) {
    healthcheck.message = error.message;
    res.status(503).json(healthcheck);
  }
});

// Default Route for Undefined Routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
