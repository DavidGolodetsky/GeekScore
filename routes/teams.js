
const express = require('express')
const Team = require('../models/team');
const router = express.Router();

router.get('/', async (req, res) => {
    user = req.query.user
    try {
        const teams = await Team.find();
        const userTeams = teams.filter(team => team.user === user)
        res.json(userTeams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const { name, coop, favorite, id, players, user, rounds, games, imageUrl } = req.body
    const team = new Team({
        id,
        name,
        user,
        games,
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

router.delete('/:id', async (req, res) => {
    try {
        await Team.findByIdAndRemove(req.params.id);
        res.status(200).json({ state: 'deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        await Team.findByIdAndUpdate(req.params.id, req.body);
        res.json({ state: 'updated' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = router;