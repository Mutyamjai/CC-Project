const mongoose = require("mongoose");
require("dotenv").config();

const db_connect = () => {

    mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("DATABASE CONNECTION SUCCESSFUL"))
    .catch((error) => {
        console.log("DATABASE CONNECTION FAILED")
        console.log(error);
    })
}

module.exports = db_connect;