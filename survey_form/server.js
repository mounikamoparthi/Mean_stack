const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req,res) {
    res.render("index");
})

app.post('/result', function(req,res){
    res.render('result',{data:req.body});
})

app.listen(8000, function() {
  console.log('listening on port 8000');
});