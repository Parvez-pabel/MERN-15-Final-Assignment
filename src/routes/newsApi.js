import express from "express";
import {
  createNewsController,
  getAllNewsController,
  getByIdNewsController,
  updateNewsController,
} from "../controllers/newsControllers.js";
import {
  categoryCreate,
  findByIdCategory,
  getAllCategory,
} from "../controllers/categoryController.js";

const newsRouter = express.Router();

//category routes
newsRouter.post("/news/category/create", categoryCreate);
newsRouter.get("/news/all-category", getAllCategory);
newsRouter.get("/news/category/:id", findByIdCategory);

//news routes
newsRouter.post("/news/create", createNewsController);
newsRouter.get("/news/all-News", getAllNewsController);
newsRouter.get("/news/all-News/:id", getByIdNewsController);
newsRouter.put("/news/update-News/:id", updateNewsController);

export default newsRouter;
