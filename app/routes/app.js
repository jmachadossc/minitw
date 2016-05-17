var express = require('express');
var mongoose = require('mongoose');
var routes = require('./routes'); 
var bodyParser = require('body-parser');
var app = express();
var dbName = 'usersDB';
var connectionString = 'mongodb://localhost:27017/' + dbName;

mongoose.connect(connectionString, function (err){
	if(err){
		console.error(err);
	}
});
app.use(bodyParser.json());
app.use(routes);
app.use('/',express.static('/home/juanmanuel/minitw-client'));


module.exports = app;
