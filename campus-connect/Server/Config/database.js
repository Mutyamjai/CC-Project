const mongoose = require('mongoose');
require('dotenv').config();

const db_connect = () => {
    const dbURI = "mongodb+srv://lnmiitcampusconnect:Oeeb1sqD2H2LvVX7@campusconnect.o27we.mongodb.net/";

    if (!dbURI) {
        console.error('DATABASE_URL environment variable is not set.');
        return;
    }

    mongoose.connect(dbURI)
    .then(() => console.log('DATABASE CONNECTION SUCCESSFUL'))
    .catch((error) => {
        console.error('DATABASE CONNECTION FAILED');
        console.error(error);
    });
}

module.exports = db_connect;
