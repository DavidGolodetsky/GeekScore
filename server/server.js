require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database!'));

server.use(express.json());
server.use(cors());


const games = require('./games');
server.use('/games', games);

const teams = require('./teams');
server.use('/teams', teams);


server.listen(3000, () => console.log("Server started!"));