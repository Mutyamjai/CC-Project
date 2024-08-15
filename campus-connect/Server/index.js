const express = require("express");
const app = express();

require("dotenv").config();
const PORT = 4000;

app.use(express.json());

app.listen(PORT, () => {
    console.log("SERVER SUCCESSFULL");
})

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Your Server is Up and running"
    })
})