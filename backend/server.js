const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes/route');

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Increase payload limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Routes
app.use("/api", router);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Connect to the database and start the server
connectDB().then(() => {
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log("Connected to DB");
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.error("Failed to connect to the database", err);
});
