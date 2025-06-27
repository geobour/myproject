const express = require('express')
const axios = require('axios')
const MeteoData = require('../models/MeteoData.js')

const router = express.Router()


// ✅ GET /meteodata/all - fetch all records from DB
router.get('/all', async (req, res) => {
    try {
        const allData = await MeteoData.find().sort({ time: -1 }); // sort by newest first
        res.json(allData);
    } catch (error) {
        console.error('Error fetching all meteo data:', error.message);
        res.status(500).json({ error: 'Failed to fetch all weather data from DB' });
    }
});


router.post('/', async (req, res) => {
    const { lat, lon } = req.body;

    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    console.log(`Received POST request for weather data at lat=${lat}, lon=${lon}`);
    console.log(`Fetching data from: ${url}`);

    try {
        const response = await axios.get(url);
        const data = response.data.current_weather;

        console.log('Weather data fetched successfully:', data);

        const saved = new MeteoData({
            latitude: lat,
            longitude: lon,
            temperature: data.temperature,
            windspeed: data.windspeed,
            weathercode: data.weathercode,
            time: data.time,
        });

        await saved.save();
        console.log('Weather data saved to MongoDB');

        res.json(data);
    } catch (error) {
        console.error('Meteo API error:', error.message);
        res.status(500).json({ error: 'Failed to fetch or save weather data' });
    }
});

// router.get('/', async (req, res) => {
//     const { lat = '52.52', lon = '13.41' } = req.query
//     const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
//
//     console.log(`Received request for weather data at lat=${lat}, lon=${lon}`)
//     console.log(`Fetching data from: ${url}`)
//
//     try {
//         const response = await axios.get(url)
//         const data = response.data.current_weather
//
//         console.log('Weather data fetched successfully:', data)
//
//
//         const saved = new MeteoData({
//             latitude: lat,
//             longitude: lon,
//             temperature: data.temperature,
//             windspeed: data.windspeed,
//             weathercode: data.weathercode,
//             time: data.time,
//         })
//
//         await saved.save()
//         console.log('Weather data saved to MongoDB')
//
//
//         res.json(data)
//     } catch (error) {
//         console.error('Meteo API error:', error.message)
//         res.status(500).json({ error: 'Failed to fetch or save weather data' })
//     }
// })


// DELETE /meteodata/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await MeteoData.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ error: 'Weather record not found' });
        }

        console.log('Deleted weather record:', deleted);
        res.json({ success: true, deleted });
    } catch (error) {
        console.error('Error deleting weather data by ID:', error.message);
        res.status(500).json({ error: 'Failed to delete weather data' });
    }
});

// DELETE /meteodata — delete all weather records
router.delete('/', async (req, res) => {
    try {
        const result = await MeteoData.deleteMany({});
        console.log(`Deleted ${result.deletedCount} weather records`);
        res.json({ success: true, deletedCount: result.deletedCount });
    } catch (error) {
        console.error('Error deleting all weather data:', error.message);
        res.status(500).json({ error: 'Failed to delete all weather data' });
    }
});

// router.get('/', async (req, res) => {
//     const { lat, lon, date, start, end } = req.query;
//     const query = {};
//
//     if (lat && lon) {
//         query.latitude = Number(lat);
//         query.longitude = Number(lon);
//     }
//
//     if (date) {
//         const dayStart = new Date(date);
//         const dayEnd = new Date(date);
//         dayEnd.setHours(23, 59, 59, 999);
//         query.time = { $gte: dayStart, $lte: dayEnd };
//     } else if (start && end) {
//         query.time = {
//             $gte: new Date(start),
//             $lte: new Date(end)
//         };
//     }
//
//     try {
//         const data = await MeteoData.find(query).sort({ time: -1 });
//         if (!data.length) {
//             return res.status(404).json({ message: 'No data found for given query' });
//         }
//         res.json(data);
//     } catch (error) {
//         console.error('Query error:', error.message);
//         res.status(500).json({ error: 'Failed to fetch meteo data' });
//     }
// });
router.post('/fetch', async (req, res) => {
    const { lat, lon, date } = req.body;

    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    // Build base URL
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    // If date is provided, add it to query to get historical or forecast data for that date
    // Open-Meteo uses start_date and end_date params for historical data queries
    if (date) {
        url += `&start_date=${date}&end_date=${date}`;
    }

    console.log(`Received POST request for weather data at lat=${lat}, lon=${lon}, date=${date || 'current'}`);
    console.log(`Fetching data from: ${url}`);

    try {
        const response = await axios.get(url);
        // For historical data, data.current_weather might not exist — it could be under hourly/daily etc.
        // But for simplicity, here we return entire response.data
        // const data = response.data;
        const data = response.data.current_weather;
        console.log('Weather data fetched successfully:', data);

        // Return the fetched data directly without saving
        res.json(data);
    } catch (error) {
        console.error('Meteo API error:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

module.exports = router
