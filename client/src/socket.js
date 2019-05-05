const io = require('socket.io-client');

function socketHandler(options) {
  var socket = io(options.baseUrl);

  socket.emit('initclient', {
    dom:
      document.head.serializeWithStyles() +
      '\n' +
      document.body.serializeWithStyles(),
    cookie: document.cookie,
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

  socket.on('browser:dom', () => {
    const str =
      document.head.serializeWithStyles() +
      '\n' +
      document.body.serializeWithStyles();
    socket.emit('initdom', str);
  });
}

module.exports = socketHandler;
