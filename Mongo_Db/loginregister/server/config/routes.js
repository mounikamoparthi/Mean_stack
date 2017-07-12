const login = require("./..controllers/login.js")

module.exports = (app) =>{
    app.get("/", function(req,res){
        login.index(req,res)
    })
    app.post("/register", function(req,res){
        login.register(req,res)
    })
}