/**
 * userContoller.js
 *
 * plantilla de controlador
 *
 * @type {exports|module.exports}
 */

var crypto      = require('crypto');
var service     = require('./service');
var user = require('../model/users');

function login(req, res, next) {
    var pass = crypto.createHash('sha1').update(req.body.password).digest('base64');
    user.getUser(req.body.email,function(err,_user){
        if(err) return res.status(500).send({error:3,mensaje:"Server Error"});
        if(_user != null){
            if (_user.b_borrado) return res.status(400).send({error:2,mensaje:"Cuenta Borrada"});
            else{
                if(_user.password == pass) return res.status(200).send({error:0, token: service.createToken(data)});
                else{
                    _user.stats.ultimo_acceso = Date.now();
                    user.add(_user,function (err) {
                        if(err) return res.status(500).send({error:3,mensaje:"Server Error"});
                        return res.status(400).send({error:1, mensaje:"Email o contrasena incorrecta"});
                    })
                }
            }
        }else return res.status(400).send({error:1, mensaje:"Email o contrasena incorrecta"});
    });
}

function register(req, res, next) {
    var _user = {"email": req.body.email,"password": crypto.createHash('sha1').update(req.body.password).digest('base64'),
                 "nombre":req.body.nombre,"apellidos":req.body.apellidos};
    user.getUser(_user.email, function(err,data){
        if(err) return res.status(500).send({error:3,mensaje:"Server Error"});
        if (data != null) return res.status(400).send({error:1, mensaje:"Usuario ya existente"});
        else{            
            user.add(_user,function(err){
                if(err) return res.status(500).send({error:3,mensaje:"Server Error"});
                else return res.status(200).send({error:0, token: service.createToken(data)});
            });
        }
    });
}

exports.login = login;
exports.register = register;
