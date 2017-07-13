var mongoose = require('mongoose');
var Login = mongoose.model("Login");
const bcrypt = require('bcrypt');
mongoose.Promise = global.Promise;

module.exports = {
    index:(req,res) => {
        console.log("Entered", req.body);
        if(req.body.password != req.body.reenterpassword){
            res.render('index',{error: "Passwords does not match"});
        }
        else{
            let newUser = new Login(
                {name: {first_name:req.body.first_name,last_name: req.body.last_name},
                emailid: req.body.emailid, birthday: req.body.birthday,
                password: req.body.password})
                
            let promise = newUser.save(function(err, user){
                if(err){
                    console.log("save error", err);
                    console.log(err['name'])
                    res.render('index', {errors: err})
                } else {
                    console.log("register success")
                    res.redirect('/success')
                }
            })
        }
},
    login: function(req,res){
        Login.findOne({emailid: req.body.emailid},(err, user) => {
            if(err){
                res.render('login',{error:err});
            }
            else{
                if(user ==null){
                    res.render('login',{error: "No user registered with that email"})
                }
                else if(!bcrypt.compareSync(req.body.password, user.password)){
                    res.render('login', {error: "Incorrect Password"});
                }
                else{
                    res.redirect('/success');
                }
            }
        })

}
}