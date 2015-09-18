var express = require('express');
var app = express();
var hbs = require('hbs');

var blogEngine = require('./blog');

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.static('public'));
//app.use(express.bodyParser());
// //Regular HTTP get
// app.get(some url, do something);
 
// //Some other page
// app.get(some other url, do something else);
 
// //I can respond to a form post
// app.post(some url, do more stuff);

//homepage
app.get('/', function(request, response){
  response.render('index',{title:"My Blog", entries:blogEngine.getBlogEntries()});
});

//about page
app.get('/about', function(request, response) {
    response.render('about',{title:"My Blog", entries:blogEngine.getBlogEntries()});
});

app.get('/article', function(request, response){
  response.render('article', {title:"About Me"});
});

app.get('/article/:id', function(req, res) {
    var entry = blogEngine.getBlogEntry(req.params.id);
    res.render('article',{title:entry.title, blog:entry});
});

//this will solve uploading to heroku code10 error
app.listen((process.env.PORT || 5000), function(){
  console.log('listening on *:5000');
});