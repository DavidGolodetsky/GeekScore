
const express = require('express')
const Game = require('../../models/game');
const router = express.Router();

router.post('/', async (req, res) => {
    const { name, coop, teams, user, favorite, imageUrl } = req.body
    const game = new Game({
        name,
        user,
        teams,
        coop,
        favorite,
        imageUrl
    });
    const newGame = await game.save();
    res.status(201).json(newGame);
})

router.get('/', async (req, res) => {
    const user = req.query.user
    const games = await Game.find({ user });
    res.status(200).json(games);
});


router.patch('/:id', async (req, res) => {
    await Game.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ state: 'updated' });
});

router.delete('/:id', async (req, res) => {
    await Game.findByIdAndRemove(req.params.id);
    res.status(200).json({ state: 'deleted' });
});

module.exports = router;