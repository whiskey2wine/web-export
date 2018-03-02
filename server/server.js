const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const sql = require('mssql');
const moment = require('moment');

// const db = require('./db.json');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
});

const config = {
  user: 'sa',
  password: 'P@ssw0rd',
  server: '172.29.0.143',
  database: 'SMWebApp',
  parseJSON: true,
};
sql.connect(config, (err) => {
  if (err) {
    console.log(err);
  }
});
const request = new sql.Request();
sql.on('error', (err) => {
  console.log(JSON.stringify(err, undefined, 2));
});

app.get('/', (req, res) => {
  res.render('index.html');
});

const yesterday = moment()
  .subtract(1, 'days')
  .format('YYYY-MM-DD');
// .toISOString();
console.log(yesterday);

const kraft = `
  select * from [Export_ConfirmLocation_Kraft] 
  where [posting_date] = dateadd(day,datediff(day,1,GETDATE()),0);
  `;

const DupGyp = `
  select * from [Export_ConfirmLocation_DupGyp] 
  where [posting_date] = dateadd(day,datediff(day,1,GETDATE()),0);
  `;

app.get('/getdata', (req, res) => {
  request
    .query(kraft)
    .then(result => result.recordset)
    .then((data) => {
      request
        .query(DupGyp)
        .then((result) => {
          const init = data.concat(result.recordset);
          res.send(init);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });

  // request
  //   .query(DupGyp)
  //   .then((result) => {
  //     data = data.concat(result.recordset);
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // res.send(db);
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
