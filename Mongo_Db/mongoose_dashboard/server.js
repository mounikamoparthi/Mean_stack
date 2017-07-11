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
mongoose.connect('mongodb://localhost/basic_mongoose');
mongoose.Promise = global.Promise;
var MongooseSchema = new mongoose.Schema({
 name: {type: String, required: true, minlength: 6},
}, {timestamps: true})
// mongoose.model('Quote', QuoteSchema);
var Mongoose = mongoose.model('Mongoose',MongooseSchema);

app.get('/', function(req,res) {
   Mongoose.find({}, function(error, results){
        if(error){
            res.render('index', {title: 'you have errors!', errors:error})
        }
        else {
            res.render('index', {results:results});
        }
    });
})

app.get('/mongooses/new', function(request,response){
	response.render('newMongoose');
})
