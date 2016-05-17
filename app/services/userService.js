'use strict';

var User = require("../models/user"),
	UserServiceInstance = new UserService(),  
	Q = require('q');

function UserService () {
}

UserService.prototype.getUser = function(emailParam){
	console.log("Retrieving user from server...");	
	return Q.nfbind(User.findOne.bind(User))({email: emailParam});
};

module.exports = UserServiceInstance;
