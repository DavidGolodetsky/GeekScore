
const express = require('express')
const Game = require('../models/game');
const router = express.Router();
const mongodb = require('mongodb')

async function getGames() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://davidGo1995:secret123#D@cluster0-kzfo9.mongodb.net/test?retryWrites=true&w=majority',
        { useNewUrlParser: true })
    return client.db('Cluster0').collection('games')
}

router.get('/', async (req, res) => {
    // user = req.query.user
    try {
        const games = await getGames();
        // const userGames = games.filter(game => game.user === user)
        res.send(await games.find({}).toArray())
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


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