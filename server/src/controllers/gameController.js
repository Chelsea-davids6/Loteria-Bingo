const { createGame, getGame, deleteGame, getAllGames } = require('../game/gameState');
const { markIcon, checkForWin } = require('../game/gameLogic');

const startNewGame = (req, res) => {
  try {
    const game = createGame();
    
    res.status(201).json({
      success: true,
      message: 'New game created',
      data: game.getState()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating game',
      error: error.message
    });
  }
};