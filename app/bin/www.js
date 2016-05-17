var app = require('../routes/app');

app.set('port', process.env.PORT || 7000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});