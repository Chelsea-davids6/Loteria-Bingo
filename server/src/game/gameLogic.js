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
    const linePatterns = ['row1', 'row2', 'row3', 'row4', 'col1', 'col2', 'col3', 'col4', 'diagonal1', 'diagonal2'];
    for (const pattern of linePatterns) {
      const positions = WINNING_PATTERNS[pattern];
      if (positions.every(pos => playerCard.marked[pos])) {
        return pattern;
      }
    }
  } else if (round === 2) {
    const clusterPatterns = Object.keys(WINNING_PATTERNS).filter(key => key.startsWith('cluster'));
    for (const pattern of clusterPatterns) {
      const positions = WINNING_PATTERNS[pattern];
      if (positions.every(pos => playerCard.marked[pos])) {
        return pattern;
      }
    }
  } else if (round === 3) {
    if (WINNING_PATTERNS.fullCard.every(pos => playerCard.marked[pos])) {
      return 'fullCard';
    }
  }
  
  return null;
}

module.exports = {
  shuffleArray,
  generatePlayerCard,
  generateRandomCall,
  markIcon,
  checkForWin,
  checkRoundWin
};