const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173"],
}

app.use(cors(corsOptions));
// const http = require('http');
// const socketIo = require('socket.io');

// const server = http.createServer(app);
// const io = socketIo(server);

// Serve a simple route
app.get("/api", (req, res) => {
  res.json({fruits: ["strawberry", "pineapple", "banana", "orange"]});
});

// // Set up WebSocket connection
// io.on('connection', (socket) => {
//   console.log('A client connected');

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     console.log('A client disconnected');
//   });
// });

// // Start the server
app.listen(8080, () => {
  console.log("Server started on port 8080");
});