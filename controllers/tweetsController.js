var _ = require('lodash');
var Tweet = require('../models/tweet');
var Following = require('../models/following');
var assert = require('assert');

module.exports = {
  findTweets: findTweets,
  findTweetsBySubmitter: findTweetsBySubmitter,
  deleteTweet: deleteTweet,
  postTweet: postTweet
};

function postTweet(request, response) {
  if (request.body.submitter && request.body.content) {
    var tweet = new Tweet(request.body);
    tweet.date = new Date();
    tweet.save(function(err) {
      if (err) {
        return response.send(err);
      }
    });
    response.send({
      message: 'Twitted!'
    });
  } else {
    response.status(400).send();
  }
}

function findTweets(request, response) {
  var follower = request.params.userEmail;
  findFollowingRelations(follower,tuits);
  function tuits(follows) {
    Tweet.find({
      submitter: follower
    }, function (err, tweets) {
      if (err) {
        return response.send(err);
      }
      var emails = _.map(follows, 'followedEmail');
      findAllFollowingTweets(emails, function(followingTweets) {
        return response.json(tweets.concat(followingTweets));
      });
    });
  }
}
function findFollowingRelations(followerParam,callback){
  assert(_.isString(followerParam), 'Follower has to be an String');
  Following.find({
      followerEmail: followerParam
    }, function (err, follows) {
      if (err) {
        return err;
      }
      callback(follows);
    });
}

function findAllFollowingTweets(followingEmails, cb) {
  assert(followingEmails && _.isArray(followingEmails), 'Emails must be an array');

  var fsTweets = [];
  var resultsCount = 0;
  _.each(followingEmails, function(email) {
    assert(_.isString(email), 'Email must be an String');
    Tweet.find({
        submitter: email
      },
      function(err, tweets) {
        resultsCount = resultsCount + 1;
        if (err) {
          return response.send(err);
        }
        fsTweets = _.concat(fsTweets, tweets);
        if (resultsCount === followingEmails.length) {
          cb(fsTweets);
        }
      });
  });
}


function findTweetsBySubmitter(request, response) {
  if (request.params.userEmail) {
    var userEmail = request.params.userEmail;
    Tweet.find({
      submitter: userEmail
    }, function(err, tweets) {
      if (err) {
        console.error(err);
        response.status(500).send(err);
      }

      response.json(tweets);
    });
  } else {
    response.status(400).send('Invalid request');
  }


}

function deleteTweet(request, response) {
  if (request.params.tweetid) {
    var tweetid = request.params.tweetid;
    Tweet.remove({
      _id: tweetid
    }, function(err, tweet) {
      if (err) {
        return response.send(err);
      }
      if (tweet) {
        response.json({
          message: 'Tweet successfully deleted!'
        });
      } else {
        response.status(500).send('Tweet not found');
      }

    });
  } else {
    response.status(400).send();
  }


}