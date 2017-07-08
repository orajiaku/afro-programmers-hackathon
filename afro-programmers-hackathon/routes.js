var app = require("./app.js").app 
var globals = require('./globals') 
var query = require('./query/query.js')
app.get('/',/**home page **/) 
app.post('/api/create_room',query.createRoom)
app.get('/api/join_room',query.joinRoom)
app.get("*",function(req, res, next){
    res.redirect('/');
});

