var mongoose = require('mongoose');
var Person = mongoose.model('Person');
mongoose.Promise = global.Promise;

module.exports = {
	index: function(req, res) {
        Person.find({}, function(err,people){
            console.log(people);
            res.json(people) 
        })
        
    },

    add: function(req, res) {
        console.log(req.params.name);
        var person = new Person({name:req.params.name});
        console.log(person);
        person.save()
        res.redirect('/') 
    },
    remove: function(req, res) {
        Person.remove({name: req.params.name}, function(err){
            if(err){
                console.log("Removing:" +err);
            }
            else{
            res.redirect('/');
            }    
        });
    },


    details: function(req, res) {
        Person.findOne({name: req.params.name}, function(err,person){
             if (err) {
                res.json(err);
            }
            else {
                res.json(person);
            }
    })
  },
}



