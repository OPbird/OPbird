/**
 * Autores: Rubén Gabás Celimendiz, Alejandro Solanas Bonilla, Daniel Uroz Hinarejos
 * NIAs: 590738, 647647, 545338
 * Proyecto: OPbird
 * Fichero:
 * Fecha: 19/5/2016
 * Funcion:
 */


angular.module("FinalApp")
    .controller('perfilCtlr', function($scope, $http, $location, TokenService, $timeout){
        //TokenService.cerrarSesion();
        if (!TokenService.isSession()) {
            $location.path("/home");
        }

        // $scope.passCompare = "";
        // $scope.$watch("passCompare", function(newValue, oldValue) {
        //     /* change noticed */
        //     console.log(newValue);
        // });

        $scope.usuario = {};
        $scope.mostarTimelines = false;
        $scope.dentro = false;
        $scope.error = {};
        $scope.user = {};
        $scope.error.noCoincide = -1;
        $scope.passCompare = "";
        $scope.passNueva = "";
        var user = {};

        var datos = TokenService.getSession();
        $scope.user_id = datos.user;
        
        $http({
            url: '/api/user/' + datos.user,
            method: "GET",
            headers: {'authorization': datos.token, user_id: datos.user}
        })
        .success(function (data) {
            $scope.user = data.user;
            user = data.user;
        })
        .error(function (data) {
                console.log("error usuario no existe");
        });

        $scope.modificarDatos = function (data) {
            $http({
                url: '/api/user',
                method: "put",
                data: {user: user, nombre: $scope.user.nombre, apellidos: $scope.user.apellidos},
                headers: {'authorization': datos.token, user_id: datos.user}
            })
            .success(function (data) {
                $scope.user = data.user;
            })
            .error(function (data) {
                console.log(data);
            });

        };

        $scope.delete = function () {
            $http({
                url: '/api/user/',
                method: "DELETE",
                headers: {
                    'authorization': datos.token, user_id: datos.user,
                    "Content-Type": "application/json;charset=utf-8"
                },
                data: {email: datos.user}
            }).then(function (response) {
                if (response.error > 0) {
                } else {
                    TokenService.cerrarSesion();
                    $location.path("/");
                }
            });
        };

        $scope.chagePass = function (data) {
            if ($scope.error.noCoincide == -1 || $scope.error.noCoincide == 1) {
                $scope.error.pass = false;
                $scope.error.pass = true;
                $scope.error.texto = "La contraseña actual no es correcta";
                $timeout(function () {
                    $scope.error.pass = false;
                }, 3000);
            } else {
                if (data == null || data.length < 6) {
                    $scope.error.pass = false;
                    $scope.error.pass = true;
                    $scope.error.texto = "El tamaño minimo de la contraseña es 6";
                    $timeout(function () {
                        $scope.error.pass = false;
                    }, 3000);
                } else {
                    $http({
                        url: '/api/user',
                        method: "put",
                        data: {user: user, passActual: $scope.passCompare, passNueva: data},
                        headers: {'authorization': datos.token, user_id: datos.user}
                    })
                    .success(function (data) {
                        $scope.passCompare = "";
                        $scope.passNueva = "";
                        $scope.error.noCoincide = -1;
                    })
                    .error(function (data) {

                    });
                }
            }
        }

        $scope.comparePasswords = function (data) {
            $http({
                url: '/api/user/comparePasswords',
                method: "post",
                data: {pass: data},
                headers: {'authorization': datos.token, user_id: datos.user}
            })
                .success(function (data) {
                    console.log("las contrasenias coinciden");
                    $scope.error.noCoincide = 0;
                })
                .error(function (data) {
                    $scope.error.noCoincide = 1;
                    console.log("las contrasenias no coinciden");

                });

        }
    })
