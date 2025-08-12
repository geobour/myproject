const express = require('express');
const router = express.Router();
const meteoController = require('../controllers/meteoController');

router.get('/all', meteoController.getAllData);
router.post('/', meteoController.createWeatherRecord);
router.delete('/:id', meteoController.deleteById);
router.delete('/', meteoController.deleteAll);
router.post('/fetch', meteoController.fetchWeather);
router.get('/top10max', meteoController.getTop10Max);
router.get('/top10max-day', meteoController.getTop10MaxDay);

module.exports = router;
