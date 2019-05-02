const express = require('express');

const app = express.Router();

function socketMiddleware(io) {
  app.get('/reload', (req, res) => {
    io.emit('browser:reload');
    res.status(200).send();
  });
  app.post('/run-eval', (req, res) => {
    const { cmd } = req.body;
    io.emit('browser:eval', cmd);
    res.status(201).send();
  });
  app.post('/set-cookie', (req, res) => {
    const { cookie } = req.body;
    io.emit('browser:set-cookie', cookie);
    res.status(201).send();
  });
  app.get('/clients', (req, res) => {
    const con = io.sockets.connected;
    const values = Object.values(con);
    const keys = Object.keys(con);
    const map = values.map((v, i) => {
      return {
        id: keys[i],
        ip: v.handshake.address,
        ua: v.handshake.headers['user-agent'],
        issued: v.handshake.issued
      };
    });
    res.json({
      clients: map
    });
  });
  return app;
}

module.exports = socketMiddleware;
