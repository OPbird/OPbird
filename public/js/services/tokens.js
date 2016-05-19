/**
 * Autores: Rubén Gabás Celimendiz, Alejandro Solanas Bonilla, Daniel Uroz Hinarejos
 * NIAs: 590738, 647647, 545338
 * Proyecto: OPbird
 * Fichero:
 * Fecha: 19/5/2016
 * Funcion:
 */

angular.module("FinalApp")
    .factory('TokenService', function(localStorageService){
        var toDoService = {};
        toDoService.key = "auth";
        if (localStorageService.get(toDoService.key)) {
            toDoService.registro = localStorageService.get(toDoService.key);
        } else {
            toDoService.registro = [];
        }
        toDoService.isSession = function() {
            if (localStorageService.get(toDoService.key)) {
                return true;
            } else {
                return false;
            }
        }

        toDoService.registrar = function(newReg) {
            toDoService.registro = newReg;
            toDoService.updaLocalStorage();
        }

        toDoService.updaLocalStorage = function() {
            localStorageService.set(toDoService.key, toDoService.registro);
        }

        toDoService.getSession = function() {
            return toDoService.registro;
        }

        toDoService.cerrarSesion = function() {
            toDoService.registro =[];
            toDoService.updaLocalStorage();
            localStorageService.remove(toDoService.key);
        }
        return toDoService;
    })