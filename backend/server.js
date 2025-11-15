const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const http = require('http');
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

// Add a simple health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Connect to the database and start the server
connectDB().then(() => {
    const port = process.env.PORT || 8080; // Use port 8080 consistently
    const server = app.listen(port, () => {
        console.log("Server is running on port", port);
        console.log("CORS enabled for:", corsOptions.origin);
    });
    
    // Keep-alive mechanism - ping itself every 10 minutes
    setInterval(() => {
        // Create the health check URL
        const healthUrl = `http://localhost:${port}/health`;
        
        // Make a simple HTTP request to ourselves
        const url = new URL(healthUrl);
        
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname,
            method: 'GET'
        };
        
        const req = http.request(options, (res) => {
            console.log(`Keep-alive ping successful: ${res.statusCode}`);
        });
        
        req.on('error', (err) => {
            console.log('Keep-alive ping failed:', err.message);
        });
        
        req.end();
    }, 10 * 60 * 1000); // Every 10 minutes
});