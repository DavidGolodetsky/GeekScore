
const express = require('express')
const User = require('../../models/user');
const router = express.Router();

// TODO:do you use it currently? 

router.post('/', async (req, res) => {
    const { id } = req.body
    const user = new User({
        id
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
})

router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});



module.exports = router;