// const express = require('express');
// const cors = require('cors');
//  const cookieParser = require('cookie-parser')
// require('dotenv').config();
// const connectDB = require('./config/db');
// const router = require('./routes/route');

// const app = express();
// const PORT = process.env.PORT || 8080;

// // Middleware
// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true
// }));

// // Increase payload limit
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

//  app.use(cookieParser())

// // Routes
// app.use("/api", router);

// // Connect to the database and start the server
// connectDB().then(() => {
//     app.listen(PORT, () => {
//         console.log("Connected to DB");
//         console.log("Server is running on port " + PORT);
//     });
// });
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const path = require('path');
const connectDB = require('./config/db');
const router = require('./routes/route');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Increase payload limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// API Routes
app.use("/api", router);

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Connect to the database and start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log("Server is running on port " + PORT);
    });
});
