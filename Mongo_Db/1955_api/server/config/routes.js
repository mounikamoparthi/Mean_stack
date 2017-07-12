const people = require("./../controllers/person.js")

module.exports = (app) =>{
  app.get("/", function(req, res) {
        person.show(req,res)
  })
  app.get('/new/:name/', function(req,res){
        person.add(req, res)
  })
  app.get('/remove/:name/', function (req, res) {
        person.remove(req, res)
  })
  app.get('/:name', function(req,res){
      person.details(req,res)
  })

}