const mongoose = require('mongoose');

const connectionModel = new mongoose.Schema({
    parkingId: Number,
    userId: String,
    floor: Number,
    date: String
});

module.exports = mongoose.model('connections', connectionModel);