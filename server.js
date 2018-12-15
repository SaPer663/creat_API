const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const port = 8000;
/* app.use(bodyParser.urlencoded({ extended: true}));
MongoClient.connect(db.url, { useNewUrlParser: true }, (err, database) => {
  if (err) {
    return console.log(err);
  }
// app.use(bodyParser.urlencoded({ extended: true}));
// app.use(bodyParser.json());
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log(`We are living on ${port}`)
  });
});
*/
/* app.use(function (request, response) {
  const adress = __dirname + "/public/index.html";
  console.log(adress);
  response.sendFile(adress);
}); */

app.use(express.static('public'));
app.listen(port, () => {
  console.log(`We are living on ${port}`)
});
// app.use(express.static('public'));
const adressMiddle = __dirname + '/public/middle.html';
const adressHard = __dirname + '/public/hard.html';
app.get('/middle', (req, res) => {
  res.sendFile(adressMiddle);
});
app.get('/hard', (req, res) => {
  res.sendFile(adressHard);
});
