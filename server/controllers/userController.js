/**
 * userContoller.js
 *
 * plantilla de controlador
 *
 * @type {exports|module.exports}
 */
var crypto = require('crypto'),
    User = require('../model/users.js');

function registrar(req, res, next) {
   return res.status(400).send("No está implementado")
}

function getUsers(req, res, next) {
    User.getUsers(function(err,user) {
        return res.status(200).send(user);
    })
}

function login(req, res, next) {
   return res.status(400).send("No está implementado")
}

exports.registrar = registrar;
exports.getUsers = getUsers;
exports.login = login;