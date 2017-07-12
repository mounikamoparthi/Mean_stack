const people = require("./../controllers/person.js")

module.exports = (app) =>{
    app.get("/", function(req, res) {
        people.index(req,res)
  })
    app.get('/new/:name/', function(req,res){
        people.add(req, res)
  })
    app.get('/remove/:name/', function (req, res) {
        people.remove(req, res)
  })
    app.get('/:name', function(req,res){
        people.details(req,res)
  })

}