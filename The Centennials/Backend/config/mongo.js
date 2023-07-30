const debug = require("debug")("hackthethon:database");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

module.exports = initDatabase = () => {
    debug("Initializing database connection...");
    let dbUri = process.env.MONGO_URI;
    let options = {
        autoIndex: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    /**
     * Start MongoDB Connection
     */
    mongoose
        .connect(dbUri, options)
        .catch((error) => debug(`Connection error: ${error}`));

    /**
     * Listeners on MongoDB Startup
     */
    const connection = mongoose.connection;
    connection.on("connected", () => {
        debug("Connected to database");
    });
    connection.on("error", (err) => {
        debug(`Database error: ${err}`);
    });
    connection.on("disconnected", () => {
        debug("Disconnected from database");
    });
    connection.on("reconnected", () => {
        debug("Reconnected to database");
    });
};
