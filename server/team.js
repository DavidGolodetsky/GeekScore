const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
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
    rounds: {
        type: Array,
        required: true
    },
    // TODO:remove image
    imageUrl: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Team', teamSchema);