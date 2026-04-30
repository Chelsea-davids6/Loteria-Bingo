const GRID_SIZE = 4; 
const TOTAL_CARDS = 16;

const WINNING_PATTERNS = {
  // blackout
  fullCard: [
    0, 1, 2, 3,
    4, 5, 6, 7,
    8, 9, 10, 11,
    12, 13, 14, 15
  ],

  // Round 1: Any line
  lines: [
    // Rows
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],

    // Columns
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],

    // Diagonals
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ],

  // Round 2: 3x3 clusters
  clusters3x3: [

    [0, 1, 2, 4, 5, 6, 8, 9, 10],
    [1, 2, 3, 5, 6, 7, 9, 10, 11],
    [4, 5, 6, 8, 9, 10, 12, 13, 14],
    [5, 6, 7, 9, 10, 11, 13, 14, 15],
  ],
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
