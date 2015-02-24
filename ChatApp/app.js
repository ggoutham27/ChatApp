
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var url = require('url');
var mongoskin = require('mongoskin');
var MongoStore = require('connect-mongo')(express);

var app = express();

var server = http.createServer(app);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '/public')));

db = mongoskin.db("mongodb://localhost:27017/ChatApp", {
	w : 1,
	'auto_reconnect': true,
	'poolSize': 20
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/',routes.index);
//app.get('/users', user.list);

app.get('/', function(req, res){
	// check if the user's credentials are saved in a cookie //
	
	res.render('index', { title: 'Login Form' });
	
	});

//app.get('/home', function(req, res) {
//	console.log('User Details: ' + req.param("username") );
//	res.render('home', {
//		title : 'Home Page',
//		"username":req.param("username")		
//		});
//	});

app.post('/loginCheck', function(req, res) {
	console.log('Inside Login Check: ' + req.param("username") + " " + req.param("password"));
	
	user.get(req.param("username"), req.param("password"), function(err, result) {
		if(!err && result) {
			console.log('After DB call: ' + result.username);
			res.render('home', {username:result.username});
		} else {
			res.redirect('/');
		}
	});
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
