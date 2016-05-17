'use strict';

var Tweet = require("../models/tweet"),
	_ = require("lodash"),
	TweetServiceInstance = new TweetService(),
	FollowService = require("./followService"),  
	Q = require('q');

function TweetService () {
}


TweetService.prototype.postTweet = function(tweetArg){
	var tweet = new Tweet(tweetArg);
   	return Q.nfbind(tweet.save.bind(tweet))();
};

TweetService.prototype.deleteTweet = function(tweetId){
	return Q.nfbind(Tweet.remove.bind(Tweet))({
      _id: tweetId
    });
};

TweetService.prototype.findTweetsBySubmitter = function(submitterParam){
	return Q.nfbind(Tweet.find.bind(Tweet), {
      submitter: submitterParam
    })();
};

TweetService.prototype.findAllFollowingTweets = function(followingEmails) {
  var promiseList = _.map(followingEmails, function(email) {
    return this.findTweetsBySubmitter(email);
	}.bind(this));
  return Q.all(promiseList);
};

TweetService.prototype.getAllTweets = function(follower){
	var alias = Q.nfbind(Tweet.find.bind(Tweet));
	var myTweets = alias({
		submitter: follower
	});
	var followingTweets = FollowService.getFollowing(follower).then(function(follows) {
		var emails = _.map(follows, 'followedEmail');
		return this.findAllFollowingTweets(emails).then(_.flatten);
	}.bind(this));
	return Q.all([myTweets, followingTweets]).then(_.flatten);
};

module.exports = TweetServiceInstance;


