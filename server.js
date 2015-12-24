// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var PORT = process.env.PORT || 8000;

// BASE SETUP
// =============================================================================
var mongoose = require('mongoose');
//mongoose.connect('mongodb://ds035735.mongolab.com:35735/api1db');
mongoose.connect('mongodb://localhost:27017/api1db');

var Bear    = require('./app/models/bearModel');

// ROUTES FOR OUR API
// =============================================================================

// middleware to use for all requests
var router = express.Router();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req,res){
    res.json({message: 'yahooo welcome to my first api!'});
});

router.use(function(req,res,next){
    //Do logging
    console.log('Something is happening in the middleware.');
    next();
});

//Bear Routes
bearRouter = require('./app/routes/bearRouter')(Bear);
app.use('/api/bears',bearRouter);


// START THE SERVER
// =============================================================================
app.listen(PORT);
console.log('Magic heppens on port ' + PORT);