var User = require('../models/user');
var express = require('express');
var router = express.Router();

// router.route('/users').get(function (request, response) {
//   User.find(function (err, users) {
//     console.log(users);
//     if (err) {
//       console.error(err);
//       return response.send(err);
//     }

//     response.json(users);
//   });
// });

router.route('/users').post(function (request, response) {
  var user = new User(request.body);

  user.save(function (err) {
    if (err) {
      return response.send(err);
    }

    response.send({ message: 'User created!' });
  });
});

router.route('/users/:id').put(function (request,response){
  User.findOne({ _id: request.params.id }, function (err, user) {
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

      response.json({ message: 'User updated!' });
    });
  });
});

router.route('/user/:email').get(function (request, response) {
  User.findOne({ _email: request.params.email}, function (err, user) {
    if (err) {
      return response.send(err);
    }

    response.json(user);
  });
});

router.route('/users/:email').delete(function (request, response) {
  User.remove({ _email: request.params.email}, function (err, user) {
    if (err) {
      return response.send(err);
    }

    response.json({ message: 'User successfully deleted!' });
  });
});

module.exports = router;