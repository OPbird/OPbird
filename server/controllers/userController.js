/**
 * userContoller.js
 *
 * plantilla de controlador
 *
 * @type {exports|module.exports}
 */

var crypto      = require('crypto');
var user = require('../model/users.js');


function login(req, res, next) {
    var _user = {"email" : req.body.email, "pass": crypto.createHash('sha1').update(req.body.pass).digest('base64')};
    user.login(_user,callbak);
    return res.status(400).send("No está implementado");
}

function register(req, res, next) {
   return res.status(400).send("No está implementado")
}

function getUsers(req, res, next) {
    User.getUsers(function(err,user) {
        return res.status(200).send(user);
    })
}



exports.register = register;
exports.getUsers = getUsers;
exports.login = login;