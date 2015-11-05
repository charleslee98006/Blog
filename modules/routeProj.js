var mongoose = require('mongoose');
var projectsSchema = new mongoose.Schema({
	text:String,
	title: String,
	date: String,
	img: String,
	link: String
//   title: { type: String }
// , rating: String
// , releaseYear: Number
// , hasCreditCookie: Boolean
 // , _id:String
});
var projects = mongoose.model('projects', projectsSchema);

module.exports = function(app) {
	
	app.get('/api/projects', function(request, response){
		projects.find(function(err, blogs){
			if(err){
				response.send(err);
			}
			console.log(blogs);
			response.json(blogs);
		});
	});

    app.post('/api/projects', function(req, res) {

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
	        projects.create({
	            text : body.body.text,
	            title : body.title.text,
	            date : body.date,
	            img : body.img,
	            link: body.link,
	            done : false

	        }, function(err, blog) {
	            if (err)
	                res.send(err);

	            // get and return all the todos after you create another
	            projects.find(function(err, blogs) {
	                if (err)
	                    res.send(err)
	                res.json(blogs);
	            });
	        });
	    });

    });
  app.put('/api/projects/:project_id', function (req, res) {
	  //var id = req.params.id;
	  //console.log("PRINTING ID:!!!!" + id);

	  var body = "";

    	req.on("data", function(data) {
    		body += data.toString();
    	});
    console.log("BOODDYYYHEREEEEEE"+ body);
    req.on("end", function() {
	  projects.update({
	  	_id : req.params.blog_id
	  },
	  {
	  	_id : req.params.blog_id,
	  	text: body,
	  },function(err, blog) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            projects.find(function(err, blogs) {
                if (err)
                    res.send(err)
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
    app.delete('/api/projects/:project_id', function(req, res) {
        projects.remove({
            _id : req.params.blog_id
        }, function(err, blog) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            projects.find(function(err, blogs) {
                if (err)
                    res.send(err)
                res.json(blogs);
            });
        });
    });
}