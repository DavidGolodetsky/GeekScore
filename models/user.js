const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('User', schema);