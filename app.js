//requires 
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

// CORS

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

// body parser

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


//Conexion a la base de datos

mongoose.connect('mongodb://localhost:27017/Usuario', { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de Datos: online');
});


//importar Rutas
var loginRoutes = require('./routes/login');
var usuarioRoutes = require('./routes/usuario');

app.use('/login', loginRoutes);
app.use('/usuario', usuarioRoutes);

app.listen(3000, () => console.log("On line"));