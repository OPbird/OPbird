/**
 * Autores: Rubén Gabás Celimendiz, Alejandro Solanas Bonilla, Daniel Uroz Hinarejos
 * NIAs: 590738, 647647, 545338
 * Proyecto: OPbird
 * Fichero:
 * Fecha: 19/5/2016
 * Funcion:
 */


angular.module("FinalApp")
//TokenService.cerrarSesion();
.controller('hashtagsCtlr', function($scope, $http, $location, TokenService, $timeout){
        if (!TokenService.isSession()) {
            $location.path("/home");
        }
        var user = {};

        var datos = TokenService.getSession();
        var cuenta = {};

        $scope.usuario = {};
        $scope.mostarTimelines = false;
        $scope.error = {};
        $scope.user = {};
        $scope.hashtags = {};

        $scope.passNueva = "";

        $scope.user_id = datos.user;
        $http({
            url: '/api/user/' + datos.user,
            method: "GET",
            headers: {'authorization': datos.token, user_id: datos.user}
        })
        .success(function (data) {
            if (data.user.cuentas.length < 1) {
                $location.path("/dashboard");
            } else {
                $scope.user = data.user;
                cuenta = data.user.cuentas[0];
                //console.log(cuenta);
            }
        })
        .error(function (data) {
                console.log("error usuario no existe");
        });


        $http({
            url: '/api/hashtag',
            method: "GET",
            headers: {'authorization': datos.token, user_id: datos.user}
        })
        .success(function (data) {
            $scope.hashtags = data.hashtags;
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

        }

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

    $scope.addHashTag = function (hashtag) {
        console.log(hashtag.indexOf("#"))
        if (hashtag.length > 0) {
            if(hashtag.indexOf("#") == 0) {
                hashtag = hashtag.substr(1,hashtag.length - 1);
            }
            $http({
                url: '/api/hashtag',
                method: "post",
                data: {hashtag: hashtag},
                headers: {'authorization': datos.token, user_id: datos.user}
            })
                .success(function (data) {
                    $scope.hashtags = data.hashtags;
                    console.log("las contrasenias coinciden");
                    $scope.error.noCoincide = 0;
                })
                .error(function (data) {
                    $scope.error.noCoincide = 1;
                    console.log("las contrasenias no coinciden");

                });
        }
        /*$http({
            url: '/api/hashtag',
            method: "post",
            data: {hashtag: hashtag},
            headers: {'authorization': datos.token, user_id: datos.user}
        })
            .success(function (data) {
                $scope.hashtags = data.hashtags;
                console.log("las contrasenias coinciden");
                $scope.error.noCoincide = 0;
            })
            .error(function (data) {
                $scope.error.noCoincide = 1;
                console.log("las contrasenias no coinciden");

            });*/

        }

        $scope.borrarHashtag = function (hash) {
            $http({
                url: '/api/hashtag/' + datos.user + '/' + hash,
                method: "delete",
                headers: {'authorization': datos.token, user_id: datos.user}
            }).success(function (data) {
                $scope.hashtags = data.hashtag;
            }).error(function (data) {

            })
        }
    })
