const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'codingdojo'}));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/mongoose_dashboard');
mongoose.Promise = global.Promise;
var MongooseSchema = new mongoose.Schema({
 name: {type: String, required: true, minlength: 3},
 color:{type: String, required: true, minlength: 3},
 type: {type: String, required: true, minlength: 3}
}, {timestamps: true})
mongoose.model('Bird',MongooseSchema);
var Mongoose = mongoose.model('Bird');

app.get('/', function(req,res) {
   Bird.find({}, function(error, results){
        if(error){
            res.render('index', {title: 'you have errors!', errors:error})
        }
        else {
            res.render('index', {results:results});
        }
    });
})

app.get('/addnew', function(request,response){
	response.render('addnew');
})

app.post('/birds', function(req,res){
    console.log("POST DATA", req.body);
    var bird_data = new Bird({name: req.body.name, color: req.body.color, type: req.body.type}) 
    bird_data.save(function(err){
        if(err){
            console.log("Error in fetching bird_data");
            errors = err;
            res.render('addnew', {errors: bird_data.errors});
        }
        else{
            console.log("Successfully added a bird");
            res.redirect('/');
        }
    })
})



