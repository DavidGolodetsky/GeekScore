const express = require("express");
const User = require("../../models/user");
const Game = require("../../models/game");
const Round = require("../../models/round");
const router = express.Router();

router.post("/", async (req, res) => {
  const { id, username } = req.body;
  const user = new User({
    id,
    username,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id, username } = req.body;
  const user = new User({
    id,
    username,
  });
  try {
    await user.update(
      { id },
      { username },
      { upsert: false },
      (error, result) => {
        if (error) {
          res.status(400).json(error);
        } else {
          res.status(200).json(result);
        }
      }
    );
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.find({ id: req.params.id });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/win-rate/:id", async (req, res) => {
  try {
    const user = req.params.id;
    const games = await Game.find({ user });
    const gameIds = games.map((e) => e.id);
    const rounds = await Round.find({ gameId: { $in: gameIds } });
    const winRates = {};
    for (let i = 0; i < rounds.length; i++) {
      const game = games.find((e) => e.id === rounds[i].gameId);
      if (winRates[game.name]) {
        winRates[game.name].totalGames += 1;
        if (rounds[i].winner === "me" || rounds[i].winner === "victory") {
          winRates[game.name].wins += 1;
        }
      } else {
        winRates[game.name] = {};
        winRates[game.name].totalGames = 1;
        if (rounds[i].winner === "me" || rounds[i].winner === "victory") {
          winRates[game.name].wins = 1;
        } else {
          winRates[game.name].wins = 0;
        }
      }
    }
    const response = {};
    for (const game in winRates) {
      if ({}.hasOwnProperty.call(winRates, game)) {
        response[game] = `${Math.floor(
          (winRates[game].wins / winRates[game].totalGames) * 100
        )}%`;
      }
    }
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
