const mongoose = require('mongoose');

const parkingsModel = new mongoose.Schema({
    parkings: [Number],
});

module.exports = mongoose.model('parkings', parkingsModel);