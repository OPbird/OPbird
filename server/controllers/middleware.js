/**
 * Autores: Rubén Gabás Celimendiz, Alejandro Solanas Bonilla, Daniel Uroz Hinarejos
 * NIAs: 590738, 647647, 545338
 * Proyecto: OPbird
 * Fichero:
 * Fecha: 19/5/2016
 * Funcion:
 */

var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config/config');

exports.ensureAuthenticated = function(req, res, next) {
    //next();
    //console.log(req.headers);
    if(!req.headers.authorization) {
        return res
            .status(403)
            .send({error: 4, message: "Acceso restringido"});
    }


    //console.log(req.headers.authorization);
    //var token = req.headers.authorization.split(" ")[1];
    //console.log(token);

    if (req.headers.authorization && req.headers.user_id) {
        var token = req.headers.authorization;
        try {
            var payload = jwt.decode(token, config.TOKEN_SECRET);

            //console.log(payload.sub + " " + req.headers.user_id);
            if (payload.sub == req.headers.user_id) {
                req.user = payload.sub;
                next();
            } else {
                return res.status(403).send({error: 3, mensaje: "La autorizacion no es valida"});
            }
            /*if(payload.exp <= moment().unix()) {
             return res
             .status(401)
             .send({message: "El token ha expirado"});
             }*/


        }catch (ex) {
            return res.status(403).send({error: 1, mensaje: "Token incorrecto"});
        }

    } else {
        return res.status(403).send({error: 3, mensaje: "La autorizacion no es valida"});
    }
}
