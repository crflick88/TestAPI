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

var Bear    = require('./app/models/bear');

// ROUTES FOR OUR API
// =============================================================================
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

router.route('/bears')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req,res){
        var bear = new Bear();
        bear.name = req.body.name;
        console.log("body: "+req.body);
        console.log("name: "+req.body.name);
    
        // save the bear and check for errors
        bear.save(function(err){
            if (err)
                res.send(err);
            res.json({message:'Bear created!'});
        });    
    })
    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req,res){
        Bear.find(function(err, bears){
            if(err)
                res.send(err);
            
            res.json(bears);
        });
    });

router.route('/bears/:bear_id')
    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req,res){
        Bear.findById(req.params.bear_id,function(err,bear){
            if(err)
                res.send(err);
            res.json(bear);
        });
    })
    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req,res){
        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id,function(err,bear){
           if (err)
               res.send(err);
            
            bear.name = req.body.name;
            
            bear.save(function(err){
                if(err)
                    res.send(err);
                
                res.json({message: 'Bear updated!'});
            });
        });
    })
    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req,res){
        Bear.remove({
            _id: req.params.bear_id
        },function(err,bear){
            if(err)
                res.send(err);
            
            res.json({message:'Successfully deleted'});
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);




// START THE SERVER
// =============================================================================
app.listen(PORT);
console.log('Magic heppens on port ' + PORT);