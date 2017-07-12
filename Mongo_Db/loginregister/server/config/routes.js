const login = require("../controllers/Loginform.js")

module.exports = (app) =>{
    app.get("/", function(req,res){
        login.index(req,res)
    })
    app.post("/login", function(req,res){
        login.login(req,res)
    })
    app.post("/success", function(req,res){
        login.success(req,res)
    })
}