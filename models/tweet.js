var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var tweetSchema = new Schema({
  content: String,
  submitter: String,
  //date: Date
});


module.exports = mongoose.model('Tweet', tweetSchema);