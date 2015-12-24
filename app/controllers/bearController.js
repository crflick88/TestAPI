var bearController = function(Bear){
    var post = function(req,res){
        var bear = new Bear();
            bear.name = req.body.name;

            // save the bear and check for errors
            bear.save(function(err){
                if (err)
                    res.send(err);
                res.json({message:'Bear created!'});
            });   
    }
    var get = function(req,res){
        Bear.find(function(err, bears){
            if(err)
                res.send(err);
            
            res.json(bears);
        });
    }
    
    
    return{
        post: post,
        get: get
    }
}

module.exports = bearController;