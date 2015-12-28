var express = require('express');

var route = function(User){
    var setupRouter = express.Router();
    
    setupRouter.route('/')
        .get(function(req,res){
//            var carlos = new User({
//                name: 'Carlos Rdz',
//                password: 'password',
//                admin: true
//            });
            var carlos = new User();
            carlos.name = "Carlos Rdz";
            carlos.password = "password";
            carlos.admin = true;
        
            carlos.save(function(err){
                if (err)
                    res.send(err);
                console.log('User saved successfully');
                res.json({success:true});
            });    
        });
    return setupRouter;
};

module.exports = route;