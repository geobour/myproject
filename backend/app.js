const express = require('express');
const logger = require('./logger');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const meteoDataRoutes = require('./routes/meteoDataRoutes');

require('dotenv').config();

const connectDB = require('./config/db');
const setupMiddleware = require('./middleware/setupMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

setupMiddleware(app);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/meteodata', meteoDataRoutes);

//DB
connectDB().then(() => {
    logger.info('MongoDB connected');
    app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
}).catch((err) => {
    logger.error(`MongoDB connection error: ${err.message}`);
});
