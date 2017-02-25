//This is the entry point of the application . It will load the express.js file.
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('./config/express');
var mongoose = require('./config/mongoose');

var db = mongoose();
var app = express();
app.listen(3000);
module.exports = app;

console.log("The server is kicking ass at http://localhost:3000");