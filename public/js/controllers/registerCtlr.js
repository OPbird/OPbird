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
    .controller('registerCtlr', function($scope, $http, $location, TokenService){
        if (TokenService.isSession()) {
            if(TokenService.getSession().admin){$location.path("/admin");}
            else {$location.path("/dashboard")}
        }
        $scope.user = {};
        $scope.registrar = true;
        $scope.error = {};
        $scope.datosConexion = {};


        $scope.go = function ( path ) {
            $location.path( path );
        };

        $scope.register = function () {
            $http.post('/api/register',
                JSON.stringify($scope.user),
                {
                    'Content-Type': 'application/json'
                })
                .success(function (data) {
                    $scope.datosConexion.email = data.user.email;
                    $scope.datosConexion.password = data.user.password;
                    $scope.registrar = false;
                    console.log(data);
                })
                .error(function (data) {
                    $scope.error.registrar = true;
                    console.log(data);
                });
        }
    })