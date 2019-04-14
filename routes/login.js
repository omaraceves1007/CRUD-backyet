var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Usuario = require('../models/usuario');

var app = express();

/*****************************************
            Autenticacion
******************************************/

app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }
        // Error de email
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas ',
                errors: err
            });
        }
        // Error de password
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }
        usuarioDB.password = '';

        //Crear token

        var token = jwt.sign({ usuario: usuarioDB }, '@c@d-en@-s33d', { expiresIn: 14400 });

        res.status(200).json({
            ok: true,
            token: token,
            usuario: usuarioDB
        });

    });
});

module.exports = app;