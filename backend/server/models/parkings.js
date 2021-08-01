const mongoose = require('mongoose');

const parkingsModel = new mongoose.Schema({
    parkings: [{
        parkingId: Number,
        floor: Number
    }],
});

module.exports = mongoose.model('parkings', parkingsModel);