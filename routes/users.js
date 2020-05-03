
const express = require('express')
const User = require('../models/user');
const router = express.Router();

// TODO:get info when more user info would be
// router.get('/', async (req, res) => {
//     try {
//         const games = await Game.find();
//         res.json(games);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });


router.post('/', async (req, res) => {
    const { id } = req.body
    const user = new User({
        id
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})


module.exports = router;