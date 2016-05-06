//util.js

//Fichero con funciones de uso general

module.exports = {
    haveUndefinedJSON: function(json){
        for(var attr in json){
            if (json[attr] == undefined) return true;
        }
        return false;
    }
};
