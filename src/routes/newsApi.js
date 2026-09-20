import express from "express";
import {
  createNewsController,
  deleteNews,
  getAllNewsController,
  getByIdNewsController,
  updateNewsController,
  UserNewsList,
} from "../controllers/newsControllers.js";
import {
  categoryCreate,
  findByIdCategory,
  getAllCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { authorize, Protect } from "../middlewares/authController.js";

const newsRouter = express.Router();

//category routes only for super admin
newsRouter.post(
  "/news/category/create",
  Protect,
  authorize("super admin"),
  categoryCreate,
);
newsRouter.get(
  "/news/all-category",
  getAllCategory,
);
newsRouter.get(
  "/news/category/:id",
  Protect,
  authorize("super admin"),
  findByIdCategory,
);
newsRouter.put(
  "/news/update-category/:id",
  Protect,
  authorize("super admin"),
  updateCategory,
);
//only super admin can delete
newsRouter.delete(
  "/news/delete-news/:id",
  Protect,
  authorize("super admin"),
  deleteNews,
);

//news routes for for public
newsRouter.get("/news/all-News", getAllNewsController);
//public details news route
newsRouter.get("/news/all-News/:id", getByIdNewsController);

//user author login
newsRouter.post(
  "/news/create",
  Protect,
  authorize("super admin", "author"),
  createNewsController,
);
newsRouter.put(
  "/news/update-News/:id",
  Protect,
  authorize("super admin", "author"),
  updateNewsController,
);
newsRouter.get(
  "/news/user-news-list",
  Protect,
  authorize("super admin", "author"),
  UserNewsList,
);

export default newsRouter;
