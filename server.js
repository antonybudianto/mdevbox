const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logsRouting = require('./api/logs');
const socketRouting = require('./api/socket');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';

io.on('connection', function(socket) {
  console.log('an user connected');

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('initclient', data => {
    socket['_modernizr'] = data.modernizr;
  });
});

app.get('/ping', (req, res) => {
  res.send('pong');
});
app.use('/api/v1/socket', socketRouting(io));
app.use('/api/v1/logs', logsRouting);
app.use('/public', express.static('client/dist'));
app.use('/web/dist', express.static('web/dist'));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/web/index.html'));
});

http.listen(PORT, HOST, () => {
  console.log(`
    ========== Minilog ==========
    Listening on port: ${PORT}
    Open UI: http://${HOST}:${PORT}/
  `);
});
