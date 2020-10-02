
const express = require('express')
const User = require('../../models/user');
const router = express.Router();

// TODO:do you use it currently? 

router.post('/', async (req, res) => {
    const { id, username } = req.body
    const user = new User({
        id,
        username
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;