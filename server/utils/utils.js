//util.js

//Fichero con funciones de uso general

var short = require('short');


module.exports = {
    haveUndefinedJSON: function(json){
        for(var attr in json){
            if (json[attr] == undefined) return true;
        }
        return false;
    },
    shortURL: function(req,res,next){
        return res.status(200).send({
            error: 0,
            url: short.generate({URL: req.params.url})
        });
    }
};
