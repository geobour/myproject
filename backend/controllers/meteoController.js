const axios = require('axios');
const MeteoData = require('../models/MeteoData.js');

// GET all records
const getAllData = async (req, res) => {
    try {
        const allData = await MeteoData.find().sort({ time: -1 });
        res.json(allData);
    } catch (error) {
        console.error('Error fetching all meteo data:', error.message);
        res.status(500).json({ error: 'Failed to fetch all weather data from DB' });
    }
};

// POST new weather record (save to DB)
const createWeatherRecord = async (req, res) => {
    const { lat, lon } = req.body;

    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    console.log(`Fetching data from: ${url}`);

    try {
        const response = await axios.get(url);
        const data = response.data.current_weather;

        const saved = new MeteoData({
            latitude: lat,
            longitude: lon,
            temperature: data.temperature,
            windspeed: data.windspeed,
            weathercode: data.weathercode,
            time: data.time,
        });

        await saved.save();
        res.json(data);
    } catch (error) {
        console.error('Meteo API error:', error.message);
        res.status(500).json({ error: 'Failed to fetch or save weather data' });
    }
};

// DELETE by ID
const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await MeteoData.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Weather record not found' });
        }
        res.json({ success: true, deleted });
    } catch (error) {
        console.error('Error deleting weather data:', error.message);
        res.status(500).json({ error: 'Failed to delete weather data' });
    }
};

// DELETE all records
const deleteAll = async (req, res) => {
    try {
        const result = await MeteoData.deleteMany({});
        res.json({ success: true, deletedCount: result.deletedCount });
    } catch (error) {
        console.error('Error deleting all weather data:', error.message);
        res.status(500).json({ error: 'Failed to delete all weather data' });
    }
};

// POST fetch weather without saving
const fetchWeather = async (req, res) => {
    const { lat, lon, date } = req.body;
    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    if (date) {
        url += `&start_date=${date}&end_date=${date}`;
    }

    try {
        const response = await axios.get(url);
        const data = response.data.current_weather;
        res.json(data);
    } catch (error) {
        console.error('Meteo API error:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
};

// GET top 10 max temperature records
const getTop10Max = async (req, res) => {
    try {
        const topTemps = await MeteoData.find()
            .sort({ temperature: -1 })
            .limit(10);
        res.json(topTemps);
    } catch (error) {
        console.error('Error fetching top 10 max temperatures:', error.message);
        res.status(500).json({ error: 'Failed to fetch top 10 max temperature data' });
    }
};

// GET top 10 max hourly temperatures for a specific day
const getTop10MaxDay = async (req, res) => {
    const { lat, lon, date } = req.query;
    if (!lat || !lon || !date) {
        return res.status(400).json({ error: 'lat, lon and date query params are required' });
    }

    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&start_date=${date}&end_date=${date}`;
        const response = await axios.get(url);

        const hourlyTemps = response.data.hourly.temperature_2m;
        const times = response.data.hourly.time;

        const hourlyData = times.map((time, idx) => ({
            time,
            temperature: hourlyTemps[idx],
        }));

        const top10 = hourlyData.sort((a, b) => b.temperature - a.temperature).slice(0, 10);
        res.json(top10);
    } catch (error) {
        console.error('Failed to fetch or process hourly data:', error.message);
        res.status(500).json({ error: 'Failed to fetch hourly temperature data' });
    }
};

module.exports = {
    getAllData,
    createWeatherRecord,
    deleteAll,
    deleteById,
    getTop10MaxDay,
    getTop10Max,
    fetchWeather
};