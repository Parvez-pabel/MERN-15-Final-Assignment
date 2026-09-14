import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import ConnectDB from "./src/utility/db.js";
import userRouter from "./src/routes/api.js";
import newsRouter from "./src/routes/newsApi.js";

const app = express();

//db connection

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

ConnectDB();
//routes
app.use("/api/v1", userRouter);
app.use("/api/v1", newsRouter);
app.get("/", (req, res) => {
  res.json({ message: "API is running successfully!" });
});

export default app;
