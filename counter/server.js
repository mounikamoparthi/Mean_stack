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


app.get('/', function(req, res) {
  if (req.session.counter == null){
    req.session.counter = 0;
  }
  req.session.counter++
 res.render("index",{count:req.session.counter});
})
app.post('/add1', function(req, res) {
 req.session.counter++
 res.redirect('/');
})
app.post('/reset', function(req, res) {
 req.session.counter=0
 res.redirect('/');
})

app.listen(8000, function() {
  console.log('listening on port 8000');
});
