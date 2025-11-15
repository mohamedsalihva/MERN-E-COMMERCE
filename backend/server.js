const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db'); 
const router = require('./routes/route');

const app = express();

// Enhanced CORS configuration for credentials
const corsOptions = {
    origin: [process.env.FRONTEND_URL || "https://mern-e-commerce-7.onrender.com", "http://localhost:3000"],
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization']
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Routes
app.use("/api", router);

// Connect to the database and start the server
connectDB().then(() => {
    const port = process.env.PORT || 8080; // Use port 8080 consistently
    app.listen(port, () => {
        console.log("Server is running on port", port);
        console.log("CORS enabled for:", corsOptions.origin);
    });
});