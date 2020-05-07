const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    gameId: {
        type: String,
        required: true
    },
    teamId: {
        type: String,
        required: true
    },
    result: {
        type: String
    },
    comment: {
        type: String
    }

});

module.exports = mongoose.model('Round', schema);