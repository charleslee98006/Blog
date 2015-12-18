var mongoose = require('mongoose');
var movieSchema = new mongoose.Schema({
	text:String,
	title: String,
	author: String,
	date: String
//   title: { type: String }
// , rating: String
// , releaseYear: Number
// , hasCreditCookie: Boolean
 // , _id:String
});
var Movie = mongoose.model('blogs', movieSchema);

// movieSchema);

module.exports = function(app) {
	
	app.get('/api/blogs', function(request, response){
		Movie.find(function(err, blogs){
			if(err){
				response.send(err);
			}
			console.log(blogs);
			response.json(blogs);
		});
	});
app.get('/api/blogs/:blog_id', function (req, res){
    Movie.findOne({
    	_id: req.params.blog_id
    }, function(err, blog) {
	    if (err)
	        res.send(err);
	            // get and return all the todos after you create another
	    Movie.find(function(err, blogs) {
	        if (err)
	            res.send(err);
	        res.json(blogs[0]);
	    });
	});
});
    app.post('/api/blogs', function(req, res) {

    	var body = "";

    	req.on("data", function(data) {
    		body += data.toString();
    		console.log(body);
    	});
    	req.on("end", function() {

    		body = JSON.parse(body);
    		console.log("Body "+body);
    		console.log("GOing in"+ body.title.text);
    		console.log("BODY.Text " + body.body.text);

	        // create a blog, information comes from AJAX request from Angular
	        Movie.create({
	            text : body.body.text,
	            title : body.title.text,
	            author : body.author,
	            date : body.date,
	            done : false
	        }, function(err, blog) {
	            if (err)
	                res.send(err);

	            // get and return all the todos after you create another
	            Movie.find(function(err, blogs) {
	                if (err)
	                    res.send(err);
	                res.json(blogs);
	            });
	        });
	    });

    });

  app.put('/api/blogs/:blog_id', function (req, res) {
	  //var id = req.params.id;
	  //console.log("PRINTING ID:!!!!" + id);

	  var body = "";

    	req.on("data", function(data) {
    		body += data.toString();
    	});
    console.log("BOODDYYYHEREEEEEE"+ body);
    req.on("end", function() {
	  Movie.update({
	  	_id : req.params.blog_id
	  },
	  {
	  	_id : req.params.blog_id,
	  	text: body,
	  },function(err, blog) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Movie.find(function(err, blogs) {
                if (err)
                    res.send(err);
                res.json(blogs);
            });
        });

	  // if (id >= 0 && id < data.posts.length) {
	  //   data.posts[id] = req.body;
	  //   res.json(true);
	  // } else {
	  //   res.json(false);
	  // }
	});
});


	// delete a todo
    app.delete('/api/blogs/:blog_id', function(req, res) {
        Movie.remove({
            _id : req.params.blog_id
        }, function(err, blog) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Movie.find(function(err, blogs) {
                if (err)
                    res.send(err);
                res.json(blogs);
            });
        });
    });
};
// module.exports = router;
