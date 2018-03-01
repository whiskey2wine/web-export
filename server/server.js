const express = require('express');
const sql = require('mssql');
const moment = require('moment');
const db = require('./db.json');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(`${__dirname}/../public`));

console.log(__dirname);

// const config = {
//   user: 'sa',
//   password: 'P@ssw0rd',
//   server: '172.29.0.143',
//   database: 'SMWebApp',
//   parseJSON: true,
// };
// sql.connect(config, (err) => {
//   if (err) {
//     console.log(err);
//   }
// });
// const request = new sql.Request();
// sql.on('error', (err) => {
//   console.log(JSON.stringify(err, undefined, 2));
// });

app.get('/', (req, res) => {
  res.render('index.html');
});
const dateTime = moment();
const yesterday = moment({
  year: dateTime.year(),
  month: dateTime.month(),
  day: dateTime.date(),
}).subtract(1, 'days');
// .toISOString();
console.log(yesterday);
app.get('/getdata', (req, res) => {
  // request
  //   .query('select * from [Export_ConfirmLocation_Kraft]')
  //   .then((result) => {
  //     res.send(result.recordset);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  res.send(db);
  // console.log(db);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
