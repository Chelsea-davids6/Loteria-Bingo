const GRID_SIZE = 4; 
const TOTAL_CARDS = 16;

const WINNING_PATTERNS = {
    fullCard: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],

    // Round 1 winning rows
    row1: [0, 1, 2, 3],
    row2: [4, 5, 6, 7],
    row3: [8, 9, 10, 11],
    row4: [12, 13, 14, 15],

    // Round 2 winning colounms 
    col1: [0, 4, 8, 12],
    col2: [1, 5, 9, 13],
    col3: [2, 6, 10, 14],
    col4: [3, 7, 11, 15],
    diagonal1: [0, 5, 10, 15],
    diagonal2: [3, 6, 9, 12],

    // Round 3 winning clusters
    cluster1: [0, 1, 4, 5],
    cluster2: [1, 2, 5, 6],
    cluster3: [2, 3, 6, 7],
    cluster4: [4, 5, 8, 9],
    cluster5: [5, 6, 9, 10],
    cluster6: [6, 7, 10, 11],
    cluster7: [8, 9, 12, 13],
    cluster8: [9, 10, 13, 14],
    cluster9: [10, 11, 14, 15],
  };
  

const ICONS = [
    "apple", "avocado", "bacon", "boiled_egg", "bread", "canned_fish",
    "carrot", "cheese", "chocolate", "coconut", "coke", "corn",
    "cucumber", "egg_plant", "french_hot_dog", "hot_tea", "lemon",
    "lollipop", "nut", "onion", "orange", "peach", "pear", "peppers",
    "pomegranate", "popcorn", "potato", "salt_pepper", "snow_flake", "taco",
    "tomato", "wine"
];

module.exports = {
  ICONS,
  GRID_SIZE,
  TOTAL_CARDS,
  WINNING_PATTERNS
};
