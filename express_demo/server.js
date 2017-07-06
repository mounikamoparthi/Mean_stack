var express = require("express");
var app = express();
app.use(express.static(__dirname + "/static"));
console.log(__dirname)
app.get('/', function(request, response) {
  response.send("<h1>Hello Express</h1>");
})
app.listen(8000, function() {
  console.log("listening on port 8000");
})