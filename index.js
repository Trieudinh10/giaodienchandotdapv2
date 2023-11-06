var express = require('express');
var app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set("views","./views")
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(8080)

app.get('/', function(req,res)
{
    res.render('home');
})

app.get('/table_1', function(req,res)
{
    res.render('table_1');
})

app.get('/table_2', function(req,res)
{
    res.render('table_2');
})




