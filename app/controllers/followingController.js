var FollowService = require("../services/followService");


module.exports = new FollowingController();

function FollowingController(){
	console.log('construyendo instancia');
}

FollowingController.prototype.getFollowing = function(request, response) {
	if (request.params.userEmail) {
		var follower = request.params.userEmail;
		FollowService.getFollowing(follower).then(response.json.bind(response)).fail(console.log);
	} else {
		response.status(400).send();
	}
};

FollowingController.prototype.getFollowers = function(request, response) {
	if (request.params.userEmail) {
		var followed = request.params.userEmail;
		FollowService.getFollowers(followed).then(response.json.bind(response)).fail(console.log);
	} else {
		response.status(400).send();
	}
};



FollowingController.prototype.follow = function (request, response) {
	if (request.params.userEmail && request.params.email) {
		var followRequest = {
			followerEmail: request.params.userEmail,
			followedEmail: request.params.email
		};
		FollowService.follow(followRequest)
		.then(response.json.bind(response)).fail(console.log);

	} else {
		response.status(400).send();
	}
};

FollowingController.prototype.unfollow = function (request, response) {
	if (request.params.userEmail && request.params.email) {
		var unfollowRequest = {
			followerEmail: request.params.userEmail,
			followedEmail: request.params.email
		};
		FollowService.unfollow(unfollowRequest).then(response.json.bind(response)).fail(console.log);
	} else {
		response.status(400).send();
	}
	

};
