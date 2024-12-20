const express = require("express");
const app = express();
const cors = require("cors");
const file_upload = require("express-fileupload");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(
    cors({
        origin: "https://campusconnectfrontend.vercel.app",
        credentials: true,
    })
)

app.use(file_upload({
    useTempFiles: true,
    tempFileDir: "/tmp"
}))

app.listen(PORT, () => {
    console.log("SERVER SUCCESSFULL");
})

const db_connect = require("./Config/database");
db_connect();

const cloudinary_connect = require("./Config/cloudinary");
cloudinary_connect();

const user_routes = require("./Routes/User");
const laundry_routes = require("./Routes/Laundry");
const cycle_routes = require("./Routes/Bicycle");
const canteen_routes = require("./Routes/Canteen");

app.use("/api/v1/cycle", cycle_routes);
app.use("/api/v1/auth", user_routes);
app.use("/api/v1/laundry", laundry_routes);
app.use("/api/v1/cycle", cycle_routes);
app.use("/api/v1/canteen", canteen_routes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Your Server is Up and running"
    })
})
