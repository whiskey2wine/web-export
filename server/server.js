const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const query = require('./db/query');

const publicPath = path.join(__dirname, '../public');
const port = 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
});

app.get('/getdata', (req, res) => {
  query
    .data()
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      console.log(e);
    });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
