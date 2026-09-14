import 'dotenv/config';
import express from "express";
import ConnectDB from "../server/src/utility/db.js";
import userRouter from './src/routes/api.js';
import cookieParser from 'cookie-parser';



const app = express();

//db connection


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


ConnectDB();
//routes
app.use("/api/v1", userRouter);
app.get("/", (req, res) => {
    res.json({ message: 'API is running successfully!' });
});





export default app;