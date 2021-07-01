const mongoose = require('mongoose');

const parkingModel = new mongoose.Schema({
    parkingId: Number,
    userId: String,
    floor: Number,
    date: String
});

module.exports = mongoose.model('connections', parkingModel);