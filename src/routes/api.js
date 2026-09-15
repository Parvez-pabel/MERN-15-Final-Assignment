import express from "express";
import {
  deleteUser,
  login,
  ProfileDetails,
  ProfileUpdate,
  registration,
  verifyOTP,
} from "../controllers/userControllers.js";
import { authorize, Protect } from "../middlewares/authController.js";
import {
  applyForAuthorController,
  contactController,
} from "../controllers/contactController.js";

const userRouter = express.Router();

//user
userRouter.post("/user/registration", registration);
userRouter.get("/user/verify-otp/:email/:otp", verifyOTP);
userRouter.post("/user/login", login);
userRouter.get(
  "/user/profile-details",
  Protect,
  authorize("author", "super admin", "user"),
  ProfileDetails,
);
userRouter.put(
  "/user/profile-details-update",
  Protect,
  authorize("author", "super admin", "user"),
  ProfileUpdate,
);
userRouter.delete(
  "/user/profile-delete/:id",
  Protect,
  authorize("super admin"),
  deleteUser,
);

//contact form routes
userRouter.post("/user/contact/form", contactController);
//author request routes

userRouter.post("/user/author/request", applyForAuthorController);

export default userRouter;
