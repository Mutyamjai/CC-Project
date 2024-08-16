const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.listen(PORT, () => {
    console.log("SERVER SUCCESSFULL");
})

const db_connect = require("./Config/database");
db_connect();

const user_routes = require("./Routes/User");

app.use("/api/v1/auth", user_routes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Your Server is Up and running"
    })
})