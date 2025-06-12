const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./logger');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        logger.info('MongoDB connected');
        app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
    })
    .catch((err) => logger.error(`MongoDB connection error: ${err.message}`));
