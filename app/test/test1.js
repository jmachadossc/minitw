'use strict';

var sinon = require('sinon'),
    tweetsController = require('../controllers/tweetsController');

describe('allUsers', function() {

  it ('should return all users',function() {

    // given
    var followServiceMock = {},
        res             = { json: sinon.spy()},
        follows           = [{followerEmail: 'user1'}, {followedEmail: 'user2'}],
        nextStub        = sinon.stub();

    // and
    followServiceMock.getFollowingRelations = sinon.stub().callsArgWith(1, null, follows);

    // when
    tweetsController.findTweets({params: {
    	userEmail: "lalo@hotmail.com"
    }}, res, nextStub);

    // then
    res.json.calledWith(follows).should.equal(true);
    nextStub.called.should.equal(false);
  });
});
