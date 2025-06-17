const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const logger = require('./logger');
const app = express();
const userRoutes = require('./routes/userRoutes');
const PORT = process.env.PORT || 5000;
require('dotenv').config();


app.use(cors({
    origin: 'http://localhost:3000', // Adjust if using frontend on another port
    credentials: true               // Required for cookies/sessions
}));

app.use(express.json());

// 🧠 Add express-session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'yourSecretKey', // Use .env in production
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,  // Set to true if using HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24  // 1 day
    }
}));

// Logging
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/users', userRoutes);

// DB Connection and Start Server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        logger.info('MongoDB connected');
        app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
    })
    .catch((err) => logger.error(`MongoDB connection error: ${err.message}`));
