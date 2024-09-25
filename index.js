import axios from "axios";
import express from "express";
const app = express();
const PORT = 3000

app.get("/", (req, res) => {
    res.render("index.ejs");
})




app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
