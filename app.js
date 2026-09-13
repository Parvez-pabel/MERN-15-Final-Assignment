import 'dotenv/config';
import express from "express";
import ConnectDB from "../server/src/utility/db.js";



const app = express();

//db connection


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


ConnectDB();
//routes
app.get("/", (req, res) => {
    res.json({ message: 'API is running successfully!' });
});

//




export default app;