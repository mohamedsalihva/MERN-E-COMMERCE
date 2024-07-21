const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db'); // Adjust the path if necessary
const router = require('./routes/route');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true
}));

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
    app.listen(process.env.PORT || 8080, () => {
        console.log("Server is running on port", process.env.PORT || 8080);
    });
});
