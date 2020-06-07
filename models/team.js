const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    coop: {
        type: Boolean,
        required: true
    },
    favorite: {
        type: Boolean,
        required: true
    },
    players: {
        type: Array,
        required: true
    },
    games: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Team', schema);