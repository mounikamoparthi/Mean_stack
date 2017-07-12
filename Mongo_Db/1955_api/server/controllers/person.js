var mongoose = require('mongoose');
var Person = mongoose.model('Person');
module.exports = {
	show: function(req, res) {
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
        Person.remove({name:new RegExp('^'+req.params.name+'$', "i")}, function(err){
            res.redirect('/');    
        });
    },


    details: function(req, res) {
        person.find({name: new RegExp('^'+req.params.name+'$', "i")}, function(err,person){
            console.log(person)
            res.redirect('/');    
        });
    },
}



