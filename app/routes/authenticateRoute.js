var config = require('../../config');

var express=require('express');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

var route = function(User){
    var authenticateRouter = express.Router();
    
    authenticateRouter.route('/')
        .post(function(req,res){
            User.findOne({
                name:req.body.name
            },function(err,user){
                if(err)
                    res.send(err);
                
                if(!user){
                    res.json({success:false,message:'Authentication failed. User not found.'});
                }else{
                    if (user.password != req.body.password){
                        res.json({success:false,message:'Authentication failed. Wrong password.'});
                    }
                    else{
                        var token = jwt.sign(user, config.secret, {expiresIn:86400});
                        
                        res.json({
                            success: true,
                            message: 'Enjoy your Token!',
                            token: token
                        });
                    }
                }
            });
        });
    return authenticateRouter;
};

module.exports = route;