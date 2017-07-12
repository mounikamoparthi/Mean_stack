var mongoose = require('mongoose');
var Login = mongoose.model("Login");
mongoose.Promise = global.Promise;

module.exports = {
    index: function(req,res){
        console.log(req.body);
        if(req.body.password != req.body.reenterpassword){
            res.render('index',{error: "Passwords does not match"});
        }
        else{
            let newUser = new User(
                {name: {first_name:req.body.first_name,last_name: req.body.last_name},
                emailid: req.body.emailid,
                password: req.body.password})
                
            let promise = user.save();
            promise.then((doc) =>{
                res.redirect('/register');
            })
            .catch(err =>{
                console.log("index error",err)
                res.render('index', {errors:err})
            })
    }
}
}