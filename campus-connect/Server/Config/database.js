const mongoose = require('mongoose');
require('dotenv').config();

const db_connect = () => {
    const dbURI = process.env.DATABASE_URL;

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
