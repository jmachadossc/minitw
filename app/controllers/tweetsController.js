var TweetService = require('../services/tweetService'),
  TweetsControllerInstance = new TweetsController();
  
module.exports = TweetsControllerInstance;

function TweetsController() {}

TweetsController.prototype.postTweet = function(request, response) {
  if (request.body.submitter && request.body.content) {
    var tweet = {
      content: request.body.content,
      submitter: request.body.submitter
    };
    TweetService.postTweet(tweet).then(response.json.bind(response)).fail(console.log);
  } else {
    response.status(400).send();
  }
};

TweetsController.prototype.findTweets = function(request, response) {
  var follower = request.params.userEmail;
  TweetService.getAllTweets(follower).then(response.json.bind(response)).fail(console.log);
};

TweetsController.prototype.findTweetsBySubmitter = function(request, response) {
  if (request.params.userEmail) {
    var userEmail = request.params.userEmail;
    TweetService.findTweetsBySubmitter(userEmail).then(response.json.bind(response)).fail(console.log);
  }
};

TweetsController.prototype.deleteTweet = function(request, response) {
  if (request.params.tweetid) {
    var tweetId = request.params.tweetid;
    TweetService.deleteTweet(tweetId)
      .then(response.end.bind(response, null))
      .fail(console.log);
  } else {
    response.status(400).send();
  }
};