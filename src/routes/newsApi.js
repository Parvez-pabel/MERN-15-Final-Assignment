import express from "express";
import { createProductController } from "../controllers/newsControllers.js";

const newsRouter = express.Router();

newsRouter.post("/news/create", createProductController);

export default newsRouter;
