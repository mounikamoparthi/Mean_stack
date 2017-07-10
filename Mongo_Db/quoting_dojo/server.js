const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');
mongoose.Promise = global.Promise;
var QuoteSchema = new mongoose.Schema({
 name: String,
 quote: String
}, {timestamps: true})
mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'User'
var Quote = mongoose.model('Quote') // We are retrieving this Schema from our Models, named 'User'

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req,res) {
    res.render('index');
});
app.post('/addquote',function(req, res){
    console.log("POST data", req.body);
    var quote = new Quote({name: req.body.name, quote: req.body.quote});
    quote.save(function(err){
        if(err){
            console.log('Something went wrong');
        }
        else {
            console.log("success");
            res.redirect('/addquote');
        }
    })
});

app.get('/addquote', function(req,res){
    Quote.find({}, function(err,quotes){
        if(err){
            console.log('there are errors');
        } else {
            console.log('successfully retrieved');
            res.render('result', {quotes : quotes});
        }
    })
});
    
app.listen(8000, function() {
    console.log("listening on port 8000");
})