const express = require('express');

const app = express.Router();

function socketMiddleware(io) {
  app.get('/reload', (req, res) => {
    io.emit('browser:reload');
    res.status(200).send();
  });
  app.get('/clients', (req, res) => {
    const con = io.sockets.connected;
    const values = Object.values(con);
    const map = values.map(v => {
      return {
        ip: v.handshake.headers.host,
        ua: v.handshake.headers['user-agent'],
        issued: v.handshake.issued
      };
    });
    console.log(map);
    res.status(200).send();
  });
  return app;
}

module.exports = socketMiddleware;
