const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static client files
app.use(express.static(path.join(__dirname, '..', 'client')));

// Simple health route
app.get('/health', (req, res) => res.send('OK'));

// In-memory chat history (ephemeral)
const HISTORY_LIMIT = 200;
const history = [];

io.on('connection', (socket) => {
  console.log('user connected', socket.id);

  // send recent history
  socket.emit('history', history.slice(-HISTORY_LIMIT));

  socket.on('message', (msg) => {
    // msg = { id, user, text, ts }
    history.push(msg);
    if (history.length > HISTORY_LIMIT) history.shift();
    io.emit('message', msg);
  });

  socket.on('typing', (name) => {
    socket.broadcast.emit('typing', name);
  });

  socket.on('stopTyping', () => {
    socket.broadcast.emit('stopTyping');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
