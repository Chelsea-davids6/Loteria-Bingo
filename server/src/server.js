const express = require("express");
const cors = require("cors");
const gameRoutes = require('./routes/gameRoutes');
const app = express();
const PORT = process.env.PORT || 5001;

const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use('/api/game', gameRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Lotería Bingo API',
    version: '2.0.0',
    endpoints: {
      legacy: 'GET /api',
      startGame: 'POST /api/game/start',
      getGame: 'GET /api/game/:gameId',
      callIcon: 'POST /api/game/:gameId/call',
      markIcon: 'POST /api/game/:gameId/mark',
      endGame: 'DELETE /api/game/:gameId',
      listGames: 'GET /api/game/list'
    }
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
});