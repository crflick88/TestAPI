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
    bearRouter.use('/:bear_id',function(req,res,next){
        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id,function(err,bear){
            if(err)
                res.status(500).send(err);
            else if(bear){
                req.bear = bear;
                console.log('Bear found: '+bear.name);
                console.log('req Bear found: '+req.bear.name);
                
                next();
            }else
                res.status(404).send('No bears found.');
            
            
        });
        
    });
    
    bearRouter.route('/:bear_id')
        // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
        .get(function(req,res){
            console.log('GET Bear found: '+req.bear.name);
            res.status(200).json(req.bear);
        })
        // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
        .put(function(req,res){    
            req.bear.name = req.body.name;
            req.bear.age = req.body.age;
            //req.bear.updated = Date.now;
        
            req.bear.save(function(err){
                if(err)
                    rest.status(500).send(err);

                res.status(200).json({message: 'Bear partialy updated!'});
            });
        })
        .patch(function(req,res){    
            if (req.body._id)
                delete req.body._id;
        
            for(var value in req.body){
                req.bear[value] = req.body[value];
            }
            //req.bear.updated = Date.now;
            req.bear.save(function(err){
                if(err)
                    rest.status(500).send(err);

                res.status(200).json({message: 'Bear completely updated!'});
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