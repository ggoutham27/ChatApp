
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

db = mongoskin.db("mongodb://localhost:27017/chatApp", {
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

app.get('/home', function(req, res) {
	console.log('User Details: ' + req.param("username") + " " + req.param("password"));
	res.render('home', {
		title : 'Home Page',
		"username":req.param("username"),
		"password":req.param("password")
		
		});
	});

app.post('/loginCheck', function(req, res) {
		req.on('end', function() {
			var paramstring = postdata.split("&");
			var param = {};
			for(var i=0; i<paramstring.length; i++) {
				var b = paramstring[i].split("=");
				param[b[0]] = b[1];
			}

			user.get(param['username'], param['password'], function(err, result) {
				if(!err && result) {
					req.session.user = {'authenticated': true, 'username': result.username};
					res.redirect('/home');
				} else {
				}
			});
		});

		var postdata = "";
		req.on('data', function(postdataChunk){
			postdata += postdataChunk;
		});
	
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
