const express = require('express');
const router = express.Router();
const {
  startNewGame,
  getGameState,
  callNextIcon,
  markPlayerIcon,
  endGame,
  listAllGames,
  resumeToNextRound 
} = require('../controllers/gameController');

// Game routes
router.post('/start', startNewGame);
router.get('/list', listAllGames);
router.get('/:gameId', getGameState);
router.post('/:gameId/call', callNextIcon);
router.post('/:gameId/mark', markPlayerIcon);
router.post('/:gameId/resume', resumeToNextRound); 
router.delete('/:gameId', endGame);

module.exports = router;
