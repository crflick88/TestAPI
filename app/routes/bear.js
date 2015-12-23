var express = require('express');

// ROUTES FOR OUR API
// =============================================================================
var routes = function(Bear){
var router = express.Router();

// middleware to use for all requests
router.use(function(req,res,next){
    //Do logging
    console.log('Something is happening in the middleware.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req,res){
    res.json({message: 'yahooo welcome to my first api!'});
});

// more routes for our API will happen here

};
    
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);