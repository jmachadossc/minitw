var User = require('../models/user');
var Tweet = require('../models/tweet');

var express = require('express');
var router = express.Router();

router.route('/tweets').get(function (request, response) {
  Tweet.find(function (err, tweets) {
    if (err) {
      console.error(err);
      return response.send(err);
    }

    response.json(tweets);
  });
});

router.route('/tweets/:email').get(function (request, response) {
  Tweet.find({ submitter: request.params.email },function (err, tweets) {
    if (err) {
      console.error(err);
      return response.send(err);
    }

    response.json(tweets);
  });
});

router.route('/tweets').post(function (request, response) {
  var tweet = new Tweet(request.body);

  tweet.save(function (err) {
    if (err) {
      return response.send(err);
    }

    response.send({ message: 'Twitted!' });
  });
});

router.route('/users').post(function (request, response) {
  var user = new User(request.body);

  user.save(function (err) {
    if (err) {
      return response.send(err);
    }

    response.send({ message: 'User created!' });
  });
});

router.route('/users/:email').put(function (request,response){
  User.findOne({ email: request.params.email }, function (err, user) {
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

router.route('/users/:email').get(function (request, response) {
  User.findOne({ email: request.params.email}, function (err, user) {
    if (err) {
      return response.send(err);
    }

    response.json(user);
  });
});

router.route('/users/:email').delete(function (request, response) {
  User.remove({ email: request.params.email}, function (err, user) {
    if (err) {
      return response.send(err);
    }

    response.json({ message: 'User successfully deleted!' });
  });
});

module.exports = router;