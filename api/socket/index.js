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
  app.get('/client/:id', (req, res) => {
    const key = req.params.id;
    const con = io.sockets.connected;
    const val = con[key];
    if (!val) {
      res.status(400).json({
        message: 'Socket ID not found'
      });
      return;
    }
    const data = {
      modernizr: JSON.parse(val._modernizr),
      id: key,
      ip: val.handshake.address,
      ua: val.handshake.headers['user-agent'],
      issued: val.handshake.issued
    };
    res.json(data);
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
