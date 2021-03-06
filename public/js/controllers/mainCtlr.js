/**
 * Autores: Rubén Gabás Celimendiz, Alejandro Solanas Bonilla, Daniel Uroz Hinarejos
 * NIAs: 590738, 647647, 545338
 * Proyecto: OPbird
 * Fichero:
 * Fecha: 19/5/2016
 * Funcion:
 */


var addr = "http://localhost:8080";

angular.module("FinalApp")
    .controller('mainCtlr', function($scope, $http, $location, TokenService){
        $scope.error = {};
        
        if (TokenService.isSession) {
            var datos = TokenService.getSession();
            $scope.user = datos.user;
            $scope.admin = datos.admin;
        }

        if (TokenService.isSession()) {
            if(($location.path() == "/") || ($location.path() == "/home")) {
                if (TokenService.getSession().admin) {
                    $location.path("/admin");
                }
                else {
                    $location.path("/dashboard")
                }
            }
        }
        
        $scope.go = function ( path ) {
            $location.path( path );
        };

        $scope.isLogged = function(){
            if(TokenService.isSession()){
                return true;
            }else{
                return false;
            }
        };

        $scope.isUser = function(){
            if((TokenService.isSession() && !(TokenService.getSession().admin))){
                return true;
            }else{
                return false;
            }
        };

        $scope.isAdmin = function(){
            if(TokenService.isSession() && TokenService.getSession().admin){
                return true;
            }else{
                return false;
            }
        };

        $scope.getAccounts = function() {
            $http({
                url: '/api/twitterAccount/' + datos.user,
                method: "GET"
            }).then(function (response) {
                if (response.error > 0) {
                } else {
                    $scope.cuentas = response.cuentas
                }
            });
        }
        

        $scope.cerrarSesion = function () {
            TokenService.cerrarSesion();
            $location.path("/");
        };

    })