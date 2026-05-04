const { ICONS, GRID_SIZE, WINNING_PATTERNS } = require('./constants');

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generatePlayerCard() {
  const shuffled = shuffleArray(ICONS)
  const totalCards = GRID_SIZE * GRID_SIZE;

  const cardIcons = shuffled.slice(0, totalCards);
  

  return {
    icons: cardIcons,
    marked: Array(totalCards).fill(false)
  };

}

function generateRandomCall() {
  return shuffleArray(ICONS);
}

// Func to mark icon on card 
function markIcon(playerCard, iconName) {
  const iconIndex = playerCard.icons.indexOf(iconName);

  if (iconIndex === -1) {
    return null;
  }

  const updatedCard = {...playerCard};
  updatedCard.marked = [...playerCard.marked];
  updatedCard.marked[iconIndex] = true;

  return updatedCard;
}

function checkForWin(playerCard) {
  for (const [patternName, positions] of Object.entries(WINNING_PATTERNS)) {
    const hasWon = positions.every(pos => playerCard.marked[pos] === true);
    
    if (hasWon) {
      return patternName;
    }
  }
  
  return null;
}

function checkRoundWin(playerCard, round) {
  if (round === 1) {
    for (const positions of WINNING_PATTERNS.lines) {
      if (positions.every(pos => playerCard.marked[pos])) {
        return 'line';
      }
    }
  } else if (round === 2) {
    for (const positions of WINNING_PATTERNS.clusters3x3) {
      if (positions.every(pos => playerCard.marked[pos])) {
        return 'cluster';
      }
    }
  } else if (round === 3) {
    if (WINNING_PATTERNS.fullCard.every(pos => playerCard.marked[pos])) {
      return 'blackout';
    }
  }
  
  return null;
}

function checkRoundPoss(playerCard, calledIcons, round) {
  const calledSet = new Set(calledIcons);
  const isCalledAt = (pos) => calledSet.has(playerCard.icons[pos]);
 
  if (round === 1) {
    return WINNING_PATTERNS.lines.some(positions => positions.every(isCalledAt));
  } else if (round === 2) {
    return WINNING_PATTERNS.clusters3x3.some(positions => positions.every(isCalledAt));
  } else if (round === 3) {
    return WINNING_PATTERNS.fullCard.every(isCalledAt);
  }
 
  return false;
}

module.exports = {
  shuffleArray,
  generatePlayerCard,
  generateRandomCall,
  markIcon,
  // checkForWin,
  checkRoundWin,
  checkRoundPoss
};