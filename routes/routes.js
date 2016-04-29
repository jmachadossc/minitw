var tweetsController = require("../controllers/tweetsController");
var usersController = require('../controllers/usersController');
var followingController = require('../controllers/followingController');

var express = require('express');
var router = express.Router();

router.route('/users/:userEmail/tweets').get(tweetsController.findTweets);
router.route('/users/:userEmail/tweets/:email').get(tweetsController.findTweetsBySubmitter);
router.route('/users/:userEmail/tweets/:tweetid').delete(tweetsController.deleteTweet);
router.route('/users/:userEmail/tweets').post(tweetsController.postTweet);

router.route('/users').post(usersController.registerUser);
router.route('/users/:email').put(usersController.updateUser);
router.route('/users/:email').get(usersController.getUser);
router.route('/users/:email').delete(usersController.deleteUser);

router.route('/users/:userEmail/followers/').get(followingController.getFollowers);

router.route('/users/:userEmail/following').get(followingController.getFollowing);
router.route('/users/:userEmail/following/:email').post(followingController.follow);
router.route('/users/:userEmail/following/:email').delete(followingController.unfollow);




module.exports = router;