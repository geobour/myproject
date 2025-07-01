const cors = require('cors');
const express = require('express');
const session = require('express-session');
const logger = require('../logger');

module.exports = (app) => {
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
            secure: false, // Set to true if using HTTPS
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 // 1 day
        }
    }));

    app.use((req, res, next) => {
        logger.info(`${req.method} ${req.url}`);
        next();
    });
};
