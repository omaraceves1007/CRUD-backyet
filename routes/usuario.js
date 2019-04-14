var express = require('express');
var Usuario = require("../models/usuario");
var bcrypt = require('bcryptjs');
var app = express();

/*****************************************
            Obtener Usuarios
******************************************/

app.get('/', (req, res) => {

    Usuario.find({}, (err, usuarios) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error Cargando Usuarios',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            usuarios: usuarios
        });
    });
});

/*****************************************
            Obtener Usuario por Id
******************************************/

app.get('/:id', (req, res) => {
    var id = req.params.id;
    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error Cargando Usuarios',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            usuarios: usuario
        });
    });
});

/*****************************************
            Crear Usuario Nuevo
******************************************/

app.post('/', (req, res) => {
    var body = req.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    });

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Usuario',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioGuardado
        });
    });
});

/*****************************************
            Modificar Usuario
******************************************/

app.put('/:id', (req, res) => {
    var id = req.params.id,
        body = req.body;
    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Usuario con id: ' + id + ' no existe',
                errors: { message: 'No existe usuario con ese id' }
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }
            usuarioGuardado.password = '';
            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        });
    });
});

/*****************************************
            Modificar Usuario
******************************************/

app.delete('/:id', (req, res) => {
    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar Usuarios',
                errors: err
            });
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No Existe Usuario',
                errors: { message: 'No Existe Usuario con ese id' }
            });
        }
        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});

module.exports = app;