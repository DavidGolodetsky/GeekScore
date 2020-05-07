
const express = require('express')
const Round = require('../../models/round');
const router = express.Router();

router.get('/', async (req, res) => {
    const user = req.query.user
    try {
        const rounds = await Round.find({ user });
        res.json(rounds);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/', async (req, res) => {
    const { name, coop, teams, user, favorite, imageUrl } = req.body
    const game = new Round({
        name,
        user,
        teams,
        coop,
        favorite,
        imageUrl
    });
    try {
        const newGame = await game.save();
        res.status(201).json(newGame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Round.findByIdAndRemove(req.params.id);
        res.status(200).json({ state: 'deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        await Round.findByIdAndUpdate(req.params.id, req.body);
        res.json({ state: 'updated' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;