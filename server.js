// server.js

// BASE SETUP
// =============================================================================
var mongoose   = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/movie'); // connect to our database
//mongoose.connect('mongodb://user:user@ds015909.mlab.com:15909/movie'); // connect to our database
mongoose.connect('mongodb://user:user@ds015899.mlab.com:15899/heroku_5fc48tw8');


var Movie = require('./app/models/movie');

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Middleware working.. Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
// ----------------------------------------------------
router.route('/movies')

    // create a movie (accessed at POST http://localhost:8080/api/movies)
    .post(function(req, res) {
        
        var movie = new Movie();      // create a new instance of the Movie model
        movie.title = req.body.title;  // set the movies info (comes from the request)
        movie.author = req.body.author; 
        movie.year = req.body.year; 

        // save the movie and check for errors
        movie.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Movie created!' });
        });
        
        
    })// get all the movies (accessed at GET http://localhost:8080/api/movies)
    .get(function(req, res) {
        Movie.find(function(err, movies) {
            if (err)
                res.send(err);

        res.json(movies);
        });
    });

// on routes that end in /movies/:movie_id
// ----------------------------------------------------
router.route('/movies/:movie_id')

    // get the movie with that id (accessed at GET http://localhost:8080/api/movies/:movie_id)
    .get(function(req, res) {
        Movie.findById(req.params.movie_id, function(err, movie) {
            if (err)
                res.send(err);
            res.json(movie);
        });
    })
    // update the movie with this id (accessed at PUT http://localhost:8080/api/movies/:movie_id)
    .put(function(req, res) {

        // use our movie model to find the movie we want
        Movie.findById(req.params.movie_id, function(err, movie) {

            if (err)
                res.send(err);

            movie.title = req.body.title;  // update the movies info

            // save the movie
            movie.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Movie updated!' });
            });

        });
    })
// delete the movie with this id (accessed at DELETE http://localhost:8080/api/movies/:movie_id)
    .delete(function(req, res) {
        Movie.remove({
            _id: req.params.movie_id
        }, function(err, movie) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);