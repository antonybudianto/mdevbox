const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logsRouting = require('./api/logs');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';

app.get('/ping', (req, res) => {
  res.send('pong');
});
app.use('/api/v1/logs', logsRouting);
app.use('/public', express.static('public'));
app.use('/web/dist', express.static('web/dist'));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/web/index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`
    ========== Minilog ==========
    Listening on port: ${PORT}
    Open UI: http://${HOST}:${PORT}/
  `);
});
