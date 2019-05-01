const io = require('socket.io-client');
var socket = io();

function socketHandler() {
  socket.on('browser:reload', () => {
    window.location.reload();
  });

  socket.on('browser:set-cookie', cookie => {
    document.cookie = cookie;
  });
}

module.exports = socketHandler;
