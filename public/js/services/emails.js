/**
 * Autores: Rubén Gabás Celimendiz, Alejandro Solanas Bonilla, Daniel Uroz Hinarejos
 * NIAs: 590738, 647647, 545338
 * Proyecto: OPbird
 * Fichero:
 * Fecha: 19/5/2016
 * Funcion:
 */


angular.module("FinalApp")
    .service('emailService', function() {
        var email = "";

        var setEmail = function(newEmail) {
            email = newEmail;
        };

        var getEmail = function() {
            return email;
        };

        return {
            setEmail: setEmail,
            getEmail: getEmail
        };
});