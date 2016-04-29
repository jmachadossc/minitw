var Tweet = require('../models/tweet');
var Following = require('../models/following');

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
  var userTweets =[];
  var f ;
  var fTweets =[];
  var fsTweets = [];
  

  Following.find({followerEmail: request.params.email}, function (err, follows){
    if (err){
      return response.send(err);
    }
    f = follows;
    tuits();
  });
  function tuits(){
    Tweet.find({submitter: request.params.userEmail}, function (err, tweets){
      if (err){
        return response.send(err);
      }
      userTweets = tweets;
      detuits();
    });
  };
  function detuits(){
    for(i=0; i<f.length;i++){
      Tweet.find({submitter: f[i]},
       function (err, tweets) {
        if (err) {
          return response.send(err);
        }
        fTweets = tweets; 
      });
      fsTweets = fsTweets.concat(fTweets);  
    }
    var allTweets = userTweets.concat(fsTweets);
    response.json(allTweets);
}
  
}

function findTweetsBySubmitter(request, response) {
  if(request.params.email){
    var email = request.params.email;
  }else{
    response.status(400).send('Invalid request');
  }
  Tweet.find({ submitter: email },function (err, tweets) {
    if (err) {
      console.error(err);
      response.status(500).send(err);
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
      response.status(500).send('Tweet not found');
    }

  });
}

