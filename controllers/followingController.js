var _ = require('lodash');
var Following = require('../models/following');
var User = require('../models/user');


module.exports = {
	follow: follow,
	unfollow: unfollow,
	getFollowing: getFollowing,
	getFollowers: getFollowers
}


function getFollowing(request, response) {
	if (request.params.userEmail) {
		var follower = request.params.userEmail;
		Following.find({
			followerEmail: follower
		}, function (err, following) {
			if (err) {
				response.send(err);
			}
			response.send(following);
		});
	} else {
		response.status(400).send();
	}


}

function getFollowers(request, response) {
	if (request.params.userEmail) {
		var followed = request.params.userEmail;
		Following.find({
			followedEmail: followed
		}, function(err, data) {
			if (err) {
				response.send(err);
			}
			response.send(followers);

		});
	} else {
		response.status(400).send();
	}
}



function follow(request, response) {
	if (request.params.userEmail && request.params.email) {
		var followRequest = new Following({
			followerEmail: request.params.userEmail,
			followedEmail: request.params.email
		});
		User.find({
				email: followRequest.followedEmail
			}, function(err, user) {
				console.log(user);
				if (_.isEmpty(user)) {
					response.status(401).send({message: 'User not valid'});
				} else {
					Following.find({
							followerEmail: followRequest.followerEmail,
							followedEmail: followRequest.followedEmail
						}, function(err, following) {
							if (_.isEmpty(following)) {
							followRequest.save(function(err) {
								if (err) {
									return response.status(500).send(err);
								}
								response.send({message: 'Followed!'});
							});
						} else {
							response.status(400).send({message: 'Already followed'});
						};
					});
			}
		});

	} else {
		response.status(400).send();
	}
}

function unfollow(request, response) {
	if (request.params.userEmail && request.params.email) {
		var unfollowRequest = new Following({
			followerEmail: request.params.userEmail,
			followedEmail: request.params.email
		});
	} else {
		response.status(400).send();
	}
	Following.remove({
		followerEmail: unfollowRequest.followerEmail,
		followedEmail: unfollowRequest.followedEmail
	}, function(err, data) {
		if (err) {
			response.send(err)
		}

		response.send({
			message: 'Unfollowed!'
		})

	});
}
