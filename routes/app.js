var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var users = require('./users'); 

var app = express();
var dbName = 'usersDB';
var connectionString = 'mongodb://localhost:27017/' + dbName;

mongoose.connect(connectionString, function (err){
	if(err){
		console.error(err);
	}
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use( users);

module.exports = app;