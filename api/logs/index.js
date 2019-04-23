const express = require('express');
const cors = require('cors');

const app = express.Router();

const MAX_LOG = process.env.MAX_LOG || 100;
let logs = [];

app.options('/', cors());

app.get('/', (req, res) => {
  res.json({ logs });
});

app.delete('/', (req, res) => {
  logs = [];
  res.status(204).send();
});

app.post('/', cors(), (req, res) => {
  const { type, href, messages } = req.body;

  const data = {
    ip: req.ip,
    origin: req.get('origin'),
    type,
    date: Date.now(),
    href,
    ua: req.header('User-Agent'),
    messages
  };
  logs.unshift(data);
  if (logs.length > MAX_LOG) {
    logs.pop();
  }
  res.status(201).send(data);
});

module.exports = app;
