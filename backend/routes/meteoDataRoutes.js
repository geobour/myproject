const express = require('express');
const router = express.Router();
const meteoController = require('../controllers/meteoController');

router.delete('/:id', meteoController.deleteById);
router.delete('/', meteoController.deleteAll);
router.post('/fetch', meteoController.fetchWeather);
router.get('/top10max-day', meteoController.getTop10MaxDay);
router.get('/top10min-day', meteoController.getTop10MinDay);

module.exports = router;
