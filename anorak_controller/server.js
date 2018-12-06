// server.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();


const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));

require('./app/routes')(app, {});


app.get("/", (req, res) => {
    console.log("200")
})

app.listen(port, () => {
    console.log('We are live on ' + port);
});
