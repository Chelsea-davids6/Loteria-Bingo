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


const getGameState = (req, res) => {
  try {
    const { gameId } = req.params;
    const game = getGame(gameId);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }

    res.json({
      success: true,
      data: game.getState()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching game state',
      error: error.message
    });
  }
};


const callNextIcon = (req, res) => {
  try {
    const { gameId } = req.params;
    const game = getGame(gameId);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }

    if (!game.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Game is not active'
      });
    }

    const nextIcon = game.callNextIcon();

    if (!nextIcon) {
      return res.status(400).json({
        success: false,
        message: 'No more icons to call'
      });
    }

    res.json({
      success: true,
      message: 'Next icon called',
      data: {
        calledIcon: nextIcon,
        gameState: game.getState()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error calling next icon',
      error: error.message
    });
  }
};

module.exports = {
  startNewGame,
  getGameState,
  callNextIcon
};
