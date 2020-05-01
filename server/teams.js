
const express = require('express')
const Team = require('./Team');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const teams = await Team.find();
        res.json(teams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const { name, coop, favorite, id, players, rounds, imageUrl } = req.body
    const team = new Team({
        id,
        name,
        coop,
        favorite,
        players,
        rounds,
        imageUrl
    });
    try {
        const newTeam = await team.save();
        res.status(201).json(newTeam);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

module.exports = router;