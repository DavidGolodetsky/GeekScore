require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const games = require('./routes/games');
const teams = require('./routes/teams');
const users = require('./routes/users');

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database!'));

app.use(express.json());
app.use(cors());


app.use('/api/games', games);
app.use('/api/teams', teams);
app.use('/api/users', users);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'))
    app.get('/.*/', (req, res) => res.sendFile(__dirname + '/public/index.html'))
}



app.listen(PORT, () => console.log("Server started!"));