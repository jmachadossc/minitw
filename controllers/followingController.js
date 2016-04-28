var Following = require('../models/following');

module.exports = {
	follow:follow,
	unfollow:unfollow,
	getFollowing:getFollowing,
	getFollowers:getFollowers
}


function getFollowing (request, response){
	if(request.params.email){
		var follower = request.params.email;		
		Following.find({ followerEmail: follower}, function (err, follows){
			if(err){
				response.send(err);
			}else if (follows){
				response.send(follows);
			}
		});
	}else{
		response.status(400).send();
	}

	
}

function getFollowers (request, response){
	if(request.params.email){
		var followed = request.params.email;		
		Following.find({ followedEmail: followed}, function (err, followers){
			if(err){
				response.send(err);
			}else if (followers){
				response.send(followers);
			}
		});
	}else{
		response.status(400).send();
	}
}


function follow (request, response){
	if(request.body.followerEmail && request.body.followedEmail){
		var following = new Following(request.body);
	}else{
		response.status(400).send();
	}
	Following.find({
		followerEmail: following.followerEmail, 
		followedEmail: following.followedEmail
	}, function (err, followers){
		if(followers){
			response.status(400).send('Already followed');
		}
	});
	following.save(function (err) {
	    if (err) {
	      return response.send(err);
	    }

    	response.send({ message: 'Followed!' });
  	});
}

function unfollow (request, response){
	if(request.data.followerEmail && request.data.followedEmail){
		var relation = new Following(request.data);
	}else{
		response.status(400).send();
	}
	Following.remove({ 
		followerEmail: relation.followerEmail,
	 	followedEmail: relation.followedEmail 
	 }, function (err, follow){
		if(err){
			response.send(err)
		}else if(follow){
			response.send({ message: 'Unfollowed!'})
		}
	});
}