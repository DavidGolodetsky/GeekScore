
const express = require('express')
const Round = require('../../models/round');
const router = express.Router();

// router.get('/', async (req, res) => {
// const user = req.query.user
// try {
//     const rounds = await Round.find({ user });
//     res.json(rounds);
// } catch (err) {
//     res.status(500).json({ message: err.message });
// }
// });


router.get('/', async (req, res) => {
    const user = req.query.user
    try {
        const rounds = await Round.find({ user });
        res.status(200).json(rounds);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


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
    try {
        const newRound = await round.save();
        res.status(201).json(newRound);
        console.log(newRound)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

TODO:
// router.delete('/:id', async (req, res) => {
// try {
//     await Round.findByIdAndRemove(req.params.id);
//     res.status(200).json({ state: 'deleted' });
// } catch (err) {
//     res.status(400).json({ message: err.message });
// }
// });


module.exports = router;