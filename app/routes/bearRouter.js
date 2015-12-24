var express = require('express');

var routes = function(Bear){
    var bearRouter = express.Router();

    // more routes for our API will happen here
    var bearController = require('../controllers/bearController')(Bear)
    bearRouter.route('/')
        // create a bear (accessed at POST http://localhost:8080/api/bears)
        .post(bearController.post)
        // get all the bears (accessed at GET http://localhost:8080/api/bears)
        .get(bearController.get);

    //Middleware for bears/id
    bearRouter.route('/:bear_id')
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
    return bearRouter;
};

module.exports = routes;