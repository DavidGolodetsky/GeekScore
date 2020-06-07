
const express = require('express')
const Round = require('../../models/round');
const router = express.Router();

router.post('/', async (req, res) => {
    const { date, gameId, teamId, user, result, comment } = req.body
    const round = new Round({
        date,
        user,
        gameId,
        teamId,
        result,
        comment
    });
    const newRound = await round.save();
    res.status(201).json(newRound);
    console.log(newRound)
})


router.get('/', async (req, res) => {
    const user = req.query.user
    const rounds = await Round.find({ user });
    res.status(200).json(rounds);
});


router.delete('/:id', async (req, res) => {
    await Round.findByIdAndRemove(req.params.id);
    res.status(200).json({ state: 'deleted' });
});


module.exports = router;