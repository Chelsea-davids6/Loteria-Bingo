const { createGame, getGame, deleteGame, getAllGames } = require('../game/gameState');
const { markIcon, checkRoundWin, checkRoundPoss } = require('../game/gameLogic');

const CLAIM_WINDOW = 2;

function updateClaimWindow(game) {
  if (game.roundAchievedAt == null &&
      checkRoundPoss(game.playerCard, game.calledIcons, game.currentRound)) {
    game.roundAchievedAt = game.calledIcons.length;
  }
}

function getClaimStatus(game) {
  if (game.roundAchievedAt == null) {
    return { claimable: false, expired: false, callsRemaining: null, achievedAt: null };
  }
  const elapsed = game.calledIcons.length - game.roundAchievedAt;
  if (elapsed > CLAIM_WINDOW) {
    return { claimable: false, expired: true, callsRemaining: 0, achievedAt: game.roundAchievedAt };
  }
  return {
    claimable: true,
    expired: false,
    callsRemaining: CLAIM_WINDOW - elapsed,
    achievedAt: game.roundAchievedAt
  };
}

const startNewGame = (req, res) => {
  try {
    const game = createGame();
    game.roundAchievedAt = null;
    
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

    updateClaimWindow(game);
    const claimStatus = getClaimStatus(game);

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

const markPlayerIcon = (req, res) => {
  try {
    const { gameId } = req.params;
    const { iconName } = req.body;

    if (!iconName) {
      return res.status(400).json({
        success: false,
        message: 'Icon name is required'
      });
    }

    const game = getGame(gameId);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }

    if (game.gameComplete) {
      return res.status(400).json({
        success: false,
        message: 'Game is already complete!'
      });
    }

    if (!game.calledIcons.includes(iconName)) {
      return res.status(400).json({
        success: false,
        message: 'This icon has not been called yet'
      });
    }

    const updatedCard = markIcon(game.playerCard, iconName);

    if (!updatedCard) {
      return res.status(400).json({
        success: false,
        message: 'Icon not found on your card'
      });
    }

    game.playerCard = updatedCard;

    console.log("Checking round:", game.currentRound); 
    const winningPattern = checkRoundWin(game.playerCard, game.currentRound);
    console.log("Winning pattern result:", winningPattern); 

    // if (winningPattern) {
    //   const previousRound = game.currentRound; 
    //   game.completeRound(game.currentRound);
      
    //   let message;
    //   if (previousRound === 1) {
    //     message = 'Round 1 Complete! Next: Find a Cluster!';
    //   } else if (previousRound === 2) {
    //     message = 'Round 2 Complete! Final Round: Blackout!';
    //   } else if (previousRound === 3) {
    //     message = 'BLACKOUT! You won the game!';
    //   }

    //   return res.json({
    //     success: true,
    //     message: message,
    //     data: {
    //       roundWon: winningPattern,
    //       currentRound: game.currentRound,
    //       gameComplete: game.gameComplete,
    //       isPaused: game.isPaused,
    //       gameState: game.getState()
    //     }
    //   });
    // }

    res.json({
      success: true,
      message: 'Icon marked',
      data: {
        hasWon: false,
        gameState: game.getState()
      }
    });
  } catch (error) {
    console.error("Error in markPlayerIcon:", error);
    res.status(500).json({
      success: false,
      message: 'Error marking icon',
      error: error.message
    });
  }
};

const claimBingo = (req, res) => {
  try {
    const { gameId } = req.params;
    const game = getGame(gameId);
 
    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }
 
    if (game.gameComplete) {
      return res.status(400).json({
        success: false,
        message: 'Game is already complete'
      });
    }
 
    const claimStatus = getClaimStatus(game);

    if (!claimStatus.claimable) {
      const message = claimStatus.expired
        ? 'Too late you missed the bingo!'
        : "No bingo on the card yet!";
      return res.status(400).json({
        success: false,
        message,
        data: { gameState: game.getState(), ...claimStatus }
      });
    }
 
    const winningPattern = checkRoundWin(game.playerCard, game.currentRound);
    if (!winningPattern) {
      return res.status(400).json({
        success: false,
        message: "Mark all the called icons in a winning pattern first!",
        data: { gameState: game.getState(), ...claimStatus }
      });
    }

    const previousRound = game.currentRound;
    game.completeRound(game.currentRound);
    game.roundAchievedAt = null;         
    updateClaimWindow(game);             
 
    let message;
    if (previousRound === 1) {
      message = 'Round 1 Complete! Next: Find a Cluster!';
    } else if (previousRound === 2) {
      message = 'Round 2 Complete! Final Round: Blackout!';
    } else if (previousRound === 3) {
      message = 'BLACKOUT! You won the game!';
    }
 
    return res.json({
      success: true,
      message,
      data: {
        roundWon: winningPattern,
        currentRound: game.currentRound,
        gameComplete: game.gameComplete,
        isPaused: game.isPaused,
        gameState: game.getState(),
        ...getClaimStatus(game)
      }
    });
  } catch (error) {
    console.error("Error in claimBingo:", error);
    res.status(500).json({
      success: false,
      message: 'Error claiming bingo',
      error: error.message
    });
  }
};

const resumeToNextRound = (req, res) => {
  try {
    const { gameId } = req.params;
    const game = getGame(gameId);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }

    game.resumeGame();
    game.roundAchievedAt = null;
    updateClaimWindow(game); 

    res.json({
      success: true,
      message: `Starting Round ${game.currentRound}!`,
      data: { ...game.getState(), ...getClaimStatus(game) }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error resuming game',
      error: error.message
    });
  }
};

const endGame = (req, res) => {
  try {
    const { gameId } = req.params;
    const deleted = deleteGame(gameId);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }

    res.json({
      success: true,
      message: 'Game ended successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error ending game',
      error: error.message
    });
  }
};

const listAllGames = (req, res) => {
  try {
    const games = getAllGames();

    res.json({
      success: true,
      data: {
        totalGames: games.length,
        games
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching games',
      error: error.message
    });
  }
};

module.exports = {
  startNewGame,
  getGameState,
  callNextIcon,
  markPlayerIcon,
  resumeToNextRound,
  endGame,
  listAllGames,
  claimBingo
};
