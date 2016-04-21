var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var movies = require('./movies'); 

var app = express();
var dbName = 'moviesDB';
var connectionString = 'mongodb://localhost:27017/' + dbName;

mongoose.connect(connectionString, function (err){
	if(err){
		console.error(err);
	}
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/api', movies);

module.exports = app;