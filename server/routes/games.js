
const express = require('express')
const Game = require('../models/game');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/', async (req, res) => {
    const { name, coop, teams, favorite, imageUrl } = req.body
    const game = new Game({
        name,
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
        await Game.findByIdAndRemove(req.params.id);
        res.status(200).json({ state: 'deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        await Game.findByIdAndUpdate(req.params.id, req.body);
        res.json({ state: 'updated' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;