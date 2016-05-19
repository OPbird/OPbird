/**
 * Autores: Rubén Gabás Celimendiz, Alejandro Solanas Bonilla, Daniel Uroz Hinarejos
 * NIAs: 590738, 647647, 545338
 * Proyecto: OPbird
 * Fichero:
 * Fecha: 19/5/2016
 * Funcion:
 */

//Fichero con funciones de uso general

var adfly = require('adf.ly')();

module.exports = {
    haveUndefinedJSON: function(json){
        for(var attr in json){
            if (json[attr] == undefined) return true;
        }
        return false;
    },
    shortURL: function(req,res,next){
        adfly.short(req.body.url,function(url){
            return res.status(200).send({
                error: 0,
                url: url
            });
        })

    }
};
