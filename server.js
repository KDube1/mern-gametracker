const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var path = require('path');
//routes
const gamesRouter = require('./routes/games');
const usersRouter = require('./routes/users');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect( uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


app.use('/api/games', gamesRouter);
app.use('/api/users', usersRouter);

if (process.env.NODE_ENV === 'production'){
  app.use(express.static('heroku-mern-app/build'));
}
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});