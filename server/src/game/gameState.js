const { generatePlayerCard, generateRandomCall } = require('./gameLogic');

const games = new Map();

class GameState {
  constructor(gameId) {
    this.gameId = gameId;
    this.playerCard = generatePlayerCard();
    this.callingOrder = generateRandomCall();
    this.calledIcons = [];
    this.currentCallIndex = 0;
    this.isActive = true;
    this.winner = null;
    this.currentRound = 1; 
    this.createdAt = new Date();
 }

  callNextIcon() {
    if (this.currentCallIndex >= this.callingOrder.length) {
      return null;
    }

    const nextIcon = this.callingOrder[this.currentCallIndex];
    this.calledIcons.push(nextIcon);
    this.currentCallIndex++;

    return nextIcon;
  }

  getState() {
    return {
        gameId: this.gameId,
        playerCard: this.playerCard,
        calledIcons: this.calledIcons,
        currentIcon: this.calledIcons[this.calledIcons.length - 1] || null,
        isActive: this.isActive,
        winner: this.winner,
        currentRound: this.currentRound,
        totalCalled: this.calledIcons.length,
        totalRemaining: this.callingOrder.length - this.currentCallIndex
    }; 
  }

  setWinner(patternName) {
    this.winner = patternName;
    this.isActive = false;
  }

  nextRound() {
    if (this.currentRound < 3) {
      this.currentRound++;
    }
  }
}

function createGame() {
  const gameId = generateGameId();
  const game = new GameState(gameId);
  games.set(gameId, game);
  return game;
}

function getGame(gameId) {
  return games.get(gameId);
}

function deleteGame(gameId) {
  return games.delete(gameId);
}

function getAllGames() {
  return Array.from(games.values()).map(game => ({
    gameId: game.gameId,
    isActive: game.isActive,
    totalCalled: game.calledIcons.length,
    currentRound: game.currentRound,
    createdAt: game.createdAt
  }));
}

function generateGameId() {
  return `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

module.exports = {
  GameState,
  createGame,
  getGame,
  deleteGame,
  getAllGames
};