'use strict';

var Following = require("../models/following"),
	assert = require("assert"),
	_ = require("lodash"),
	FollowServiceInstance = new FollowService(),  
	Q = require('q'),
	UserService = require("./userService");

function FollowService () {
}


FollowService.prototype.getFollowing = function(followerParam){
	assert(_.isString(followerParam), 'Follower has to be an String');
	return Q.nfbind(Following.find.bind(Following), {followerEmail: followerParam})();
};

FollowService.prototype.findFollowingRelations = function(followerParam, followedParam){
	assert(_.isString(followerParam), 'Follower has to be an String');
	return Q.nfbind(Following.find.bind(Following), {followerEmail: followerParam,followedEmail: followedParam})();
};

FollowService.prototype.getFollowers = function(followedParam){
	assert(_.isString(followedParam), 'Followed has to be an String');
	return Q.nfbind(Following.find.bind(Following), {followedEmail: followedParam})();
};

FollowService.prototype.follow = function(followRequest){
	return UserService.getUser(followRequest.followedEmail).then(function (user){
		if (_.isEmpty(user)) {
			throw new Error('User not valid');
		} else {
			return this.findFollowingRelations(followRequest.followerEmail,followRequest.followedEmail)
			.then(function (following){
				if(_.isEmpty(following)){
					var FollowRequest = new Following(followRequest);
					return Q.nfbind(FollowRequest.save.bind(FollowRequest))();
				}else{
					throw new Error("Already followed");
				}
			});
		}
	}.bind(this));
	
};

FollowService.prototype.unfollow = function(unfollowRequest){
	return Q.nfbind(Following.remove.bind(Following))({
		followerEmail: unfollowRequest.followerEmail,
		followedEmail: unfollowRequest.followedEmail
	});
};

module.exports = FollowServiceInstance;

