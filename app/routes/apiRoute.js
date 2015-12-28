var express = require('express');

var route = function(){
    var apiRouter = express.Router();
    
    apiRouter.use('/',function(req,res,next){
        //Do logging
        console.log('authentication occures now.');
        next();
    });
    apiRouter.route('/')
        // create a bear (accessed at POST http://localhost:8080/api/bears)
        .get(function(req,res){
                res.status(200);
        });
    
    return apiRouter;
}


module.exports = route;