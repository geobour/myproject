const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const logger = require('./logger');
const userRoutes = require('./routes/userRoutes');
const meteoDataRoutes = require("./routes/meteoDataRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use('/api/users', userRoutes);
app.use('/api/meteodata', meteoDataRoutes);  // <- Use meteodata router

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        logger.info('MongoDB connected');
        app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
    })
    .catch((err) => logger.error(`MongoDB connection error: ${err.message}`));
