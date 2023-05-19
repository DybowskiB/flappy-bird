const express = require('express');
const rpio = require("rpio")

const app = express();
app.use(express.static('public'));

const buttonPin = 25;
const sensorPin = 20;
const ledPin = 24;

// Set up pins
rpio.open(buttonPin, rpio.INPUT, rpio.PULL_UP);
rpio.open(sensorPin, rpio.INPUT, rpio.PULL_UP);
rpio.open(ledPin, rpio.OUTPUT, rpio.HIGH);

// Handle events
rpio.poll(buttonPin, buttonPressed);
rpio.poll(sensorPin, sensorTouched);

function buttonPressed(pin) {
    // Send message
    io.emit('buttonPressed');
    console.log(`Button pressed ${pin}`);
}

function sensorTouched(pin) {
    // Send message
    io.emit('sensorTouched');
    console.log(`Sensor is touched ${pin}`);
}

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

// Cleanup
process.on('SIGINT', () => {
    rpio.close(buttonPin);
    rpio.close(sensorPin);
    rpio.close(ledPin);
    console.log('Program closed');
    process.exit();
  });