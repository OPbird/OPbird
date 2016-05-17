/**
 * userContoller.js
 *
 * plantilla de controlador
 *
 * @type {exports|module.exports}
 */

var crypto      = require('crypto');
var passwoid    = require('passwoid');
var service     = require('./service');
var user        = require('../model/users');

module.exports = {

    login: function (req, res, next) {
        var pass = crypto.createHash('sha1').update(req.body.password).digest('base64');
        user.getUser(req.body.email, function (err, _user) {
            if (err) return res.status(500).send({error: 3, mensaje: "Server Error"});
            if (_user != null) {
                if (_user.b_borrado) return res.status(400).send({error: 2, mensaje: "Cuenta Borrada"});
                else {
                    if (_user.password == pass) return res.status(200).send({
                        error: 0,token: service.createToken(data)
                    });
                    else {
                        _user.stats.ultimo_acceso = Date.now();
                        user.add(_user, function (err) {
                            if (err) return res.status(500).send({error: 3, mensaje: "Server Error"});
                            return res.status(400).send({error: 1, mensaje: "Email o contrasena incorrecta"});
                        })
                    }
                }
            } else return res.status(400).send({error: 1, mensaje: "Email o contrasena incorrecta"});
        });
    },

    //TODO: hay que genrar el pass automaticamente, no se coge del form
    register: function (req, res, next) {
        var pass = passwoid(8);
        var _user = {
            "email": req.body.email, "password": crypto.createHash('sha1').update(pass).digest('base64'),
            "nombre": req.body.nombre, "apellidos": req.body.apellidos
        };
        user.getUser(_user.email, function (err, data) {
            if (err) return res.status(500).send({error: 3, mensaje: "Server Error"});
            if (data != null) return res.status(400).send({error: 1, mensaje: "Usuario ya existente"});
            else {
                user.add(_user, function (err) {
                    _user.password = pass;
                    if (err) return res.status(500).send({error: 3, mensaje: "Server Error"});
                    else return res.status(200).send({error: 0, user: _user,token: service.createToken(data)});
                });
            }
        });
    },

    getUser: function(req,res,next){
        user.getUser(req.body.email,function (err,data) {
            if (err) return res.status(500).send({error: 3, mensaje: "Server Error"});
            if (data != null){
                data.password = null;
                return res.status(200).send({error: 0, user: data});
            }else return res.status(400).send({error: 1, mensaje: "Usuario no existente"});
        });
    },

    getUsers: function(req,res,next){
        user.getUsers(function (err,data) {
            if (err) return res.status(500).send({error: 3, mensaje: "Server Error"});
            if (data != null){
                return res.status(200).send({error: 0, users: data});
            }else return res.status(400).send({error: 1, mensaje: "No Hay usuarios en la bbdd"});
        });
    },

    updateUser: function(req,res,next){
        user.getUser(req.body.email,function (err,data) {
            if (err) return res.status(500).send({error: 3, mensaje: "Server Error"});
            if (data != null){
                if(req.body.newEmail != null){
                    user.getUser(req.body.newEmail,function (err,data2) {
                        if (err) return res.status(500).send({error: 3, mensaje: "Server Error"});
                        if (data2 == null){ data.email = req.body.newEmail;}
                        else return res.status(400).send({error: 1, mensaje: "Nuevo Email ya existente"});
                    });
                }
                if(req.body.password != null) data.password = req.body.password;
                if(req.body.nombre != null) data.nombre = req.body.nombre;
                if(req.body.apellidos != null) data.apellidos = req.body.apellidos;
                user.add(data,function(err){
                    if (err) return res.status(500).send({error: 3, mensaje: "Server Error"});
                    return res.status(200).send({error: 0, user: data});
                });
            }else return res.status(400).send({error: 1, mensaje: "Usuario no existente"});
        });
    },

    deleteUser: function(req,res,next){
        user.getUser(req.body.email,function (err,data) {
            if (err) return res.status(500).send({error: 3, mensaje: "Server Error"});
            if (data != null){
                user.removeUser(req.body.email,function(err){
                    if (err) return res.status(500).send({error: 3, mensaje: "Server Error"});
                    else return res.status(200).send({error: 0, mensaje: "Cuenta Borrada"});
                });
            }else return res.status(400).send({error: 1, mensaje: "Usuario no existente"});
        });
    }
};