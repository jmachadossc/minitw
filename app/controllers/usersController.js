var User = require('../models/user'),
UserService = require("../services/userService"),
UsersControllerInstance = new UsersController();

module.exports = UsersControllerInstance;


function UsersController(){}



UsersController.prototype.registerUser = function(request, response) {
  if(request.body.email && request.body.name){
    var user = new User(request.body);
    user.save(function (err) {
      if (err) {
        return response.send(err);
      }

      response.send({ message: 'User created!' });
    });
  }else{
    response.status(400).send('Cannot register incomplete user');
  }


};

UsersController.prototype.updateUser = function(request,response){
  if(request.params.userEmail){
    var userEmail = request.params.userEmail;
    User.findOne({ email: userEmail }, function (err, user) {
      if (err) {
        return response.send(err);
      }

      for (var prop in request.body) {
        user[prop] = request.body[prop];
      }

      user.save(function (err) {
        if (err) {
          return response.send(err);
        }

        if(user){
          response.json({ message: 'User updated!' });
        }else{
          response.status(404).send('User not found');
        }
      });
    });    
  }else{
    request.status(400).send();
  }
};

UsersController.prototype.getUser = function(request, response) {
  if(request.params.userEmail){
    var userEmail = request.params.userEmail;
    UserService.getUser(userEmail).then(response.json.bind(response)).fail(console.log);
  }else{
    request.status(400).send('Invalid user email');
  }

};

UsersController.prototype.deleteUser = function(request, response) {
  if(request.params.userEmail){
    var userEmail = request.params.userEmail;
    User.remove({ email: userEmail}, function (err, user) {
      if (err) {
        return response.send(err);
      }

      if (user) {
        response.json({
          message: 'User successfully deleted!'
        });
      } else {
        response.status(404).send('User not found');
      }
    });
  }else{
    request.status(400).send();
  }
  
};