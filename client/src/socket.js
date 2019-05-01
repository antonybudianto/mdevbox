const io = require('socket.io-client');
var socket = io();

function socketHandler() {
  socket.on('browser:reload', () => {
    window.location.reload();
  });
}

module.exports = socketHandler;
