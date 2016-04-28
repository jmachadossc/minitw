var Tweet = require('../models/tweet');

module.exports = {
	findTweets:findTweets, 
	findTweetsBySubmitter:findTweetsBySubmitter,
	deleteTweet:deleteTweet,
	postTweet:postTweet
}
function postTweet(request, response) {
  if(request.body.submitter && request.body.content){
    var tweet = new Tweet(request.body);
    tweet.date = new Date();
  }else{
    response.status(400).send();
  }
  
  tweet.save(function (err) {
    if (err) {
      return response.send(err);
    };
  });
  response.send({ message: 'Twitted!' });
}

function findTweets(request, response) {
  Tweet.find(function (err, tweets) {
    if (err) {
      console.error(err);
      return response.send(err);
    }

    response.json(tweets);
  });
}

function findTweetsBySubmitter(request, response) {
  if(request.params.email){
    var email = request.params.email;
  }else{
    response.status(400).send();
  }
  Tweet.find({ submitter: email },function (err, tweets) {
    if (err) {
      console.error(err);
      return response.send(err);
    }

    response.json(tweets);
  });
  
}

function deleteTweet(request, response) {
  if(request.params.tweetid){
    var tweetid = request.params.tweetid;    
  }else{
    response.status(400).send();
  }

  Tweet.remove({ _id: tweetid }, function (err, tweet) {
    if (err) {
      return response.send(err);
    }
    if(tweet){
      response.json({ message: 'Tweet successfully deleted!' });      
    }else{
      response.status(404).send(new Error('Tweet not found'));
    }

  });
}

