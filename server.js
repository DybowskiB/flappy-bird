const express = require('express');
const readline = require('readline');
const keypress = require('keypress');

const app = express();
app.use(express.static('public'));
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Keys configuration
keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

// Press handling
process.stdin.on('keypress', (ch, key) => {
  if (key && key.name === 'space') {
    // Send message
    io.emit('buttonPressed');
    console.log('Spacebar pressed');
  }
});

process.stdin.on('keypress', (ch, key) => {
  if (key && key.name === 'tab') {
    // Send message
    io.emit('sensorTouched');
    console.log('Sensor is touched');
  }
});

// WebSocket server configuration
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Listen for connection with client
io.on('connection', (socket) => {
  // Client connection handling
  console.log('Client connected');

  // Handling of closing connection by client
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Server start
const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});