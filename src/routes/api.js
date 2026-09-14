import express from "express";
import { login, ProfileDetails, ProfileUpdate, registration, verifyOTP } from "../controllers/userControllers.js";
import { Protect } from "../middlewares/authController.js";

const userRouter = express.Router();

//user
userRouter.post("/user/registration", registration);
userRouter.get("/user/verify-otp/:email/:otp", verifyOTP);
userRouter.post("/user/login", login);
userRouter.get("/user/profile-details", Protect, ProfileDetails);
userRouter.put("/user/profile-details-update", Protect, ProfileUpdate);





export default userRouter;