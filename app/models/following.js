var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var followingSchema = new Schema({
  followerEmail: String,
  followedEmail: String

});


module.exports = mongoose.model('Following', followingSchema);