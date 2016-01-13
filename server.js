'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
var port = 3000;

// import models 
require('./app/models/baju');

// views
app.use(express.static('public/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

// routes
var baju_routes = require('./app/controllers/baju');
app.use('/baju', baju_routes);

app.get('/', function (req, res) {
    res.redirect('/baju');
});

// Main loop
connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

function listen () {
  app.listen(port);
  console.log('Express app started on port ' + port);
}

function connect () {
  var options = {server: {socketOptions: {keepAlive: 1}}};
  return mongoose.connect('mongodb://127.0.0.1/cloud', options).connection;
}
