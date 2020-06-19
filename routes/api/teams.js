
const express = require('express')
const Team = require('../../models/team');
const router = express.Router();

router.post('/', async (req, res) => {
    const { name, coop, favorite, id, players, user, games } = req.body
    const team = new Team({
        id,
        name,
        user,
        games,
        coop,
        favorite,
        players
    });
    try {
        const newTeam = await team.save();
        res.status(201).json(newTeam);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.get('/', async (req, res) => {
    const user = req.query.user
    try {
        const teams = await Team.find({ user });
        res.status(200).json(teams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        await Team.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ state: 'updated' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        await Team.findByIdAndRemove(req.params.id);
        res.status(200).json({ state: 'deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;