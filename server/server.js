const express = require("express");
const cors = require("cors");
const { generatePlayerCard } = require("./src/game/gameLogic");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.post("/api/game/start", (req, res) => {
  console.log("Starting new game");
  
  const playerCard = generatePlayerCard();
  
  res.json({
    success: true,
    playerCard: playerCard
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});