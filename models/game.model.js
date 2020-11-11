const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  username: { type: String, required: true },
  game: { type: String, required: true },
  hours: { type: Number, required: true },
  system: { type: String, required: true },
}, {
  timestamps: true,
});

const Game = mongoose.model('Game', exerciseSchema);

module.exports = Game;