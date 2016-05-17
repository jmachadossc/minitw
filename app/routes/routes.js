var tweetsController = require("../controllers/tweetsController");
var usersController = require('../controllers/usersController');
var followingController = require('../controllers/followingController');

var express = require('express');
var router = express.Router();

router.route('/users/:userEmail/tweets/following').get(tweetsController.findTweets.bind(tweetsController));
router.route('/users/:userEmail/tweets').get(tweetsController.findTweetsBySubmitter.bind(tweetsController));
router.route('/users/:userEmail/tweets/:tweetid').delete(tweetsController.deleteTweet.bind(tweetsController));
router.route('/users/:userEmail/tweets').post(tweetsController.postTweet.bind(tweetsController));

router.route('/users').post(usersController.registerUser);
router.route('/users/:userEmail').put(usersController.updateUser);
router.route('/users/:userEmail').get(usersController.getUser);
router.route('/users/:userEmail').delete(usersController.deleteUser);

router.route('/users/:userEmail/followers/').get(followingController.getFollowers);

router.route('/users/:userEmail/following').get(followingController.getFollowing);
router.route('/users/:userEmail/following/:email').post(followingController.follow);
router.route('/users/:userEmail/following/:email').delete(followingController.unfollow);




module.exports = router;