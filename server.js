// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended:true})); //what is extended for????
app.use(bodyParser.json());
//app.set('superSecret',config.secret);

var PORT = process.env.PORT || 8000;

// use morgan to log requests to the console
app.use(morgan('dev'));

// BASE SETUP
// =============================================================================
var mongoose = require('mongoose');
//mongoose.connect('mongodb://admin:admin@ds035735.mongolab.com:35735/api1db');
mongoose.connect(config.database);

var Bear    = require('./app/models/bearModel');
var User   = require('./app/models/userModel');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

//Setup Router
setupRoute = require('./app/routes/setupRoute')(User);
app.use('/api/setup',setupRoute);

//Authenticate Route
authenticateRoute = require('./app/routes/authenticateRoute')(User);
app.use('/api/authenticate',authenticateRoute);

// middleware to use for all requests
router.use('/api',function(req,res,next){
    console.log('Authentication occures here.');
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token){
        // verifies secret and checks exp
        jwt.verify(token,config.secret,function(err,decoded){
            if(err)
                return res.json({success:false,message:'Failed to authenticate token.'});
            
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            next();
        });
    }else{
        // if there is no token
        // return an error
        return res.status(403).send({success:false,message:'No token provided.'});
    }
    
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req,res){
    res.json({message: 'yahooo welcome to my first api!'});
});

//server router
app.use('/',router);

//User Route
userRoute = require('./app/routes/userRoute')(User);
app.use('/api/users',userRoute);

//Bear Route
bearRoute = require('./app/routes/bearRoute')(Bear);
app.use('/api/bears',bearRoute);





// START THE SERVER
// =============================================================================
app.listen(PORT);
console.log('Magic heppens on port ' + PORT);