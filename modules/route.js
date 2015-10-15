var mongoose = require('mongoose');
var movieSchema = new mongoose.Schema({
	text:String
//   title: { type: String }
// , rating: String
// , releaseYear: Number
// , hasCreditCookie: Boolean
 // , _id:String
});
var Movie = mongoose.model('movies', movieSchema);

// movieSchema);

module.exports = function(app) {
	
	app.get('/api/movies', function(request, response){
		Movie.find(function(err, blogs){
			if(err){
				response.send(err);
			}
			console.log(blogs);
			response.json(blogs);
		});
	});

    app.post('/api/movies', function(req, res) {

    	var body = "";

    	req.on("data", function(data) {
    		body += data.toString();
    	});
    	req.on("end", function() {

    		body = JSON.parse(body);
    		// console.log("BODY " + body.text);

	        // create a todo, information comes from AJAX request from Angular
	        Movie.create({
	            text : body.text,
	            done : false
	        }, function(err, blog) {
	            if (err)
	                res.send(err);

	            // get and return all the todos after you create another
	            Movie.find(function(err, blogs) {
	                if (err)
	                    res.send(err)
	                res.json(blogs);
	            });
	        });
	    });

    });
	// delete a todo
    app.delete('/api/movies/:blog_id', function(req, res) {
        Movie.remove({
            _id : req.params.blog_id
        }, function(err, blog) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Movie.find(function(err, blogs) {
                if (err)
                    res.send(err)
                res.json(blogs);
            });
        });
    });
}