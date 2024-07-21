const mongoose = require("mongoose");

// Hardcoded MongoDB URI
const MONGODB_URI = 'mongodb://localhost:27017/users'; // Replace with your actual MongoDB URI

async function connectDB() {
    try {
        // Use the hardcoded URI
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

module.exports = connectDB;
