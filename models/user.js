const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    username: {
        type: String
    }
});

module.exports = mongoose.model('User', schema);