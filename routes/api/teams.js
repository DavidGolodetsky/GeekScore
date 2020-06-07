
const express = require('express')
const Team = require('../../models/team');
const router = express.Router();

router.post('/', async (req, res) => {
    const { name, coop, favorite, id, players, user, rounds, games } = req.body
    const team = new Team({
        id,
        name,
        user,
        games,
        coop,
        favorite,
        players,
        rounds
    });
    const newTeam = await team.save();
    res.status(201).json(newTeam);
})

router.get('/', async (req, res) => {
    const user = req.query.user
    const teams = await Team.find({ user });
    res.status(200).json(teams);
});

router.patch('/:id', async (req, res) => {
    await Team.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ state: 'updated' });
});


router.delete('/:id', async (req, res) => {
    await Team.findByIdAndRemove(req.params.id);
    res.status(200).json({ state: 'deleted' });
});

module.exports = router;