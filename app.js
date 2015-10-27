var express = require('express');
var cookieParser = require('cookie-parser');
  // Retrieve
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)  
var Data = [];
// Connect to the db
mongoose.connect("mongodb://localhost:27017/test");

var app = express();
var routes = require('./modules/route')(app);
var User = require('./modules/account');
// require('./modules/controllers/showPost')(app);

// require routes
var routes = require('./routes/api.js');

 app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
    app.use(cookieParser());

app.use('/node_modules', express.static(__dirname + '/node_modules')); //need this path to get angular.js
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/views', express.static(__dirname+'/views'));
app.use(express.static('public'));


app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// passport config
app.use('/user/',routes);

	// app.get('/api/movies', function(request, response){
	// 	Movie.find(function(err, blogs){
	// 		if(err){
	// 			response.send(err);
	// 		}
	// 		// data = blogs;
	// 		response.json(blogs);
	// 	});
	// });

	//     // create todo and send back all todos after creation
 //    app.post('/api/movies', function(req, res) {

 //        // create a todo, information comes from AJAX request from Angular
 //        Movie.create({
 //            text : req.body.text,
 //            done : false
 //        }, function(err, blogs) {
 //            if (err)
 //                res.send(err);

 //            // get and return all the todos after you create another
 //            Movie.find(function(err, blogs) {
 //                if (err)
 //                    res.send(err)
 //                res.json(blogs);
 //            });
 //        });

 //    });


app.get('/', function(request, response){
	console.log(response);	
  response.sendFile(__dirname + '/views/index.html');
});
// app.get('/newBlogPost', function(request, response){
// 	response.sendFile(__dirname + '/views/newBlogPost.html')
// });
// app.get('/about', function(request, response){
// 	console.log(response);	
//   response.sendFile(__dirname + '/views/about/aboutMe.html');
// });
// //this will solve uploading to heroku code10 error
app.listen((process.env.PORT || 5000), function(){
  console.log('listening on *:5000');
});