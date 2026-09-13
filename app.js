import express from "express";


const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req, res) => {
    res.json({ message: 'API is running successfully!' });
});

//




export default app;