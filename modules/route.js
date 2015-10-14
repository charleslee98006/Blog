var mongoose = require('mongoose');
// var movieSchema = new mongoose.Schema({
// 	text:String
// //   title: { type: String }
// // , rating: String
// // , releaseYear: Number
// // , hasCreditCookie: Boolean
// // , _id:String
// });
var Movie = mongoose.model('movies', {
 	text : String
});

// movieSchema);

module.exports = function(app) {
	
	app.get('/api/movies', function(request, response){
		Movie.find(function(err, blogs){
			if(err){
				response.send(err);
			}
			response.json(blogs);
		});
	});

	app.post('/api/movies', function(request, response){
	Movie.create({
		text:request.body.text,
		done: false
	},function(err, blogs){
		if(err){
			response.send(err);
		}
		// get and return all the todos after you create another
        Movie.find(function(err, blogs) {
        	if (err)
                response.send(err)
                response.json(blogs);
            });
	});
});
}