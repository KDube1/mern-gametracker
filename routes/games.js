const router = require('express').Router();
let Game = require('../models/game.model');

router.route('/').get((req, res) => {
  Game.find()
    .then(games => res.json(games))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const game = req.body.game;
  const hours = Number(req.body.hours);
  const system = req.body.system;

  const newGame = new Game({
    username,
    game,
    hours,
    system,
  });

  newGame.save()
  .then(() => res.json('Game added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Game.findById(req.params.id)
      .then(game => res.json(game))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    Game.findByIdAndDelete(req.params.id)
      .then(() => res.json('Game deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/update/:id').post((req, res) => {
    Game.findById(req.params.id)
      .then(game => {
        game.username = req.body.username;
        game.game = req.body.game;
        game.hours = Number(req.body.hours);
        game.system = req.body.system;
  
        game.save()
          .then(() => res.json('Game updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });


module.exports = router;