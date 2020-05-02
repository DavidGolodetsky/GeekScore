require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const games = require('./routes/games');
const teams = require('./routes/teams');

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database!'));

app.use(express.json());
app.use(cors());


app.use('/games', games);
app.use('/teams', teams);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}



app.listen(PORT, () => console.log("Server started!"));