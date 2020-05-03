const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('User', userSchema);