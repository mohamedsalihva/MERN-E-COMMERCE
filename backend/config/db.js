const mongoose = require("mongoose");

const MONGODB_URI = 'mongodb://localhost:27017/users';

async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

module.exports = connectDB;
