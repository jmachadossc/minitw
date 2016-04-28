var tweetsController = require("../controllers/tweetsController");
var usersController = require('../controllers/usersController');
var followingController = require('../controllers/followingController');

var express = require('express');
var router = express.Router();

router.route('/tweets').get(tweetsController.findTweets);
router.route('/tweets/:email').get(tweetsController.findTweetsBySubmitter);
router.route('/tweets/:tweetid').delete(tweetsController.deleteTweet);
router.route('/tweets').post(tweetsController.postTweet);

router.route('/users').post(usersController.registerUser);
router.route('/users/:email').put(usersController.updateUser);
router.route('/users/:email').get(usersController.getUser);
router.route('/users/:email').delete(usersController.deleteUser);

router.route('/follow').post(followingController.follow);
router.route('/follow').put(followingController.unfollow);

router.route('/follow/following/:email').get(followingController.getFollowing);
router.route('/follow/followers/:email').get(followingController.getFollowers);


module.exports = router;