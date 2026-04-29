const express = require("express");
const cors = require("cors");
const gameRoutes = require('./routes/gameRoutes');
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.get("/api/game", (req, res) => {
  res.json({ message: "Game API is available" });
});

app.post("/api/game/start", (req, res) => {
  console.log("Starting new game");
  
  const playerCard = generatePlayerCard();
  const gameId = `game_${Date.now()}`;
  
  res.json({
    success: true,
    playerCard: playerCard,
    gameId: gameId,
  });
});

app.post("/api/game/call-next", (req, res) =>  {
  const callingOrder = generateRandomCall();
  const nextIcon = callingOrder[0];

  console.log("Calling icon:", nextIcon);

  res.json({
    success: true,
    calledIcon: nextIcon
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});