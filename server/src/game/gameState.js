const { generatePlayerCard, generateRandomCall } = require('./gameLogic');

const games = new Map();

class GameState {
  constructor(gameId) {
    this.gameId = gameId;
    this.playerCard = generatePlayerCard();
    this.callingOrder = generateCallingOrder();
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

}