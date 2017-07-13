const login = require("../controllers/Loginform.js")

module.exports = (app) =>{
    app.get('/', (req, res) => {
        res.render('index');
  })
    app.get('/login', (req, res) => {
        res.render('login');
  })
    app.get('/success', (req, res) => {
        res.render('success');
  })
    app.post('/register', (req, res) => {
        login.index(req, res);
  })
    app.post('/login', (req, res) => {
        login.login(req, res);
  })
}