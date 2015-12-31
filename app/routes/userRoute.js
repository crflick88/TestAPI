var express = require('express');

var route = function(User){
    var userRouter = express.Router();
    
    userRouter.use('/',function(req,res,next){
        if (!req.decoded.admin)
                res.json({success:false,message:'User is not administrator.'});
        next();
    });
    
    userRouter.route('/')
        .get(function(req,res){
            User.find(function(err,users){
                if (err)
                    res.send(err);
                
                res.json(users);
            });
        })
        .post(function(req,res){
            var user = new User();
        
            
        
            user.name = req.body.name;
            user.password = req.body.password;
            user.admin = req.body.admin;
        
            user.save(function(err,user){
                if(err)
                    res.send(err);
                res.json({success:true,message:'User created successfully.'});
            });
        });
    
    return userRouter;
};

module.exports = route;