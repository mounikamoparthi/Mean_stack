const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.use(session({secret: 'codingdojo'}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req,res) {
    if (req.session.number === undefined){
        req.session.number = Math.floor((Math.random())*101)
    }
    console.log(req.session.number)
    res.render("index", {num: req.session.number, result: req.session.result});
})

app.post('/result', function(req,res){
    let num_guess = req.body.number // html file name in form is number
    
    if(num_guess == req.session.number){
        console.log('correct')
        req.session.result = 'correct'
    }
    else if(num_guess > req.session.number){
        console.log('High')
        req.session.result = 'high'
    }
    else{
        console.log('Low')
        req.session.result = 'low'
    }
    res.redirect('/');
})
app.get('/reset', function(req, res) {
 req.session.destroy()
 res.redirect('/');
})

app.listen(8000, function() {
  console.log('listening on port 8000');
});
