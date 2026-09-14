import express from "express";
import { login, registration, verifyOTP } from "../controllers/userControllers.js";

const userRouter = express.Router();

//user
userRouter.post("/user/registration", registration);
userRouter.get("/user/verify-otp/:email/:otp", verifyOTP);
userRouter.post("/user/login", login);





export default userRouter;