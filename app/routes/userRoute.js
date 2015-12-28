var express = require('express');

var route = function(User){
    var userRouter = express.Router();
    
    userRouter.route('/')
        .get(function(req,res){
            User.find(function(err,users){
                if (err)
                    res.send(err);
                
                res.json(users);
            });
        });
    
    return userRouter;
};

module.exports = route;