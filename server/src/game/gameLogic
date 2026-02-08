const grid = {
    rowOne: ["#", "#", "#", "#"], 
    rowTwo: ["#", "#", "#", "#"],
    rowThree: ["#", "#", "#", "#"],
    rowFour: ["#", "#", "#", "#"]
  };
  

  const icons = [
    "bread", "apple", "avocado", "bacon", "boiled_egg", "canned_fish",
    "carrot", "cheese", "chocolate", "coconut", "coke", "corn",
    "cucumber", "egg_plant", "french_hot_dog", "hot_tea", "lemon",
    "lollipop", "nut", "onion", "orange", "peach", "pear",
    "popcorn"
  ];
  

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
};

const picker = () => {
  shuffleArray(icons); 

  let iconIndex = 0;
  const gridRows = Object.keys(grid); 

  for (let row of gridRows) {
      for (let col = 0; col < grid[row].length; col++) {
          if (iconIndex < icons.length) {
              grid[row][col] = icons[iconIndex]; 
              iconIndex++;
          }
      }
  }
};

const caller = () => {
  shuffleArray(icons);
}


picker();
caller();
console.log(grid);
