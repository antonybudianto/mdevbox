const io = require('socket.io-client');

function socketHandler(options) {
  var socket = io(options.baseUrl);

  socket.emit('initclient', {
    modernizr: JSON.stringify(Modernizr)
  });

  socket.on('browser:reload', () => {
    window.location.reload();
  });

  socket.on('browser:set-cookie', cookie => {
    document.cookie = cookie;
  });

  socket.on('browser:eval', cmd => {
    eval(cmd);
  });
}

module.exports = socketHandler;
