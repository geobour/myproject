const mongoose = require('mongoose')

const MeteoDataSchema = new mongoose.Schema({
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    temperature: Number,
    time: String,
    fetchedAt: { type: Date, default: Date.now },
})

const MeteoData = mongoose.model('MeteoData', MeteoDataSchema)
module.exports = MeteoData
