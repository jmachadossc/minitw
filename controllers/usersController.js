var User = require('../models/user');

module.exports = {
	registerUser:registerUser,
	getUser:getUser,
	deleteUser:deleteUser,
	updateUser:updateUser
}

function registerUser(request, response) {
  if(request.body.email && request.body.name){
    var user = new User(request.body);
  }else{
    response.status(400).send('Cannot register incomplete user');
  }

  user.save(function (err) {
    if (err) {
      return response.send(err);
    }

    response.send({ message: 'User created!' });
  });
};

function updateUser(request,response){
  if(request.params.userEmail){
    var userEmail = request.params.userEmail;    
  }else{
    request.status(400).send();
  }
  User.findOne({ email: userEmail }, function (err, user) {
    if (err) {
      return response.send(err);
    }

    for (prop in request.body) {
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
};

function getUser(request, response) {
  if(request.params.userEmail){
    var userEmail = request.params.userEmail;
  }else{
    request.status(400).send('Invalid user email');
  }
  User.findOne({ email: userEmail }, function (err, user) {
    if (err) {
      return response.send(err);
    }
    if(user){
      response.json(user); 
    }else{
      response.status(404).send('User not found');
    }
  });
};

function deleteUser(request, response) {
  if(request.params.userEmail){
    var userEmail = request.params.userEmail;
  }else{
    request.status(400).send();
  }
  User.remove({ email: userEmail}, function (err, user) {
    if (err) {
      return response.send(err);
    }

    if(user){
      response.json({ message: 'User successfully deleted!' });
    }else{
      response.status(404).send('User not found');
    }
  });
};