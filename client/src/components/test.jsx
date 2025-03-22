import BingoCard from "./components/BingoCard";

const testImages = ["cokebig", "cokesmall", "donut", "bread", "popcorn", "star"];

function App() {
  return <BingoCard cardImages={testImages} />; 
}

export default App;
