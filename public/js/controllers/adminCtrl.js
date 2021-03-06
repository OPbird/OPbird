/**
 * Autores: Rubén Gabás Celimendiz, Alejandro Solanas Bonilla, Daniel Uroz Hinarejos
 * NIAs: 590738, 647647, 545338
 * Proyecto: OPbird
 * Fichero:
 * Fecha: 19/5/2016
 * Funcion:
 */


angular.module("FinalApp")
    .controller('adminCtlr', function($scope, $http, $location, TokenService, emailService) {
        if (!TokenService.isSession()) {
            $location.path("/home");
        }


        $scope.edit = function(usuario) {
            $http({
                url: '/api/user',
                method: "put",
                data: {user: usuario, nombre: usuario.nombre, apellidos: usuario.apellidos},
                headers: {'authorization': datos.token, user_id: datos.user}
            })
            .success(function (data) {
                $scope.user = data.user;
                $http({
                    url: '/api/user/',
                    method: "GET",
                    headers: { 'authorization': datos.token, user_id: datos.user}
                }).then(function (response) {
                    if (response.error > 0) {
                    } else {
                        $scope.users = response.data.users;
                    }
                });
            })
            .error(function (data) {
                console.log(data);
            });
        };

        $scope.info = function(email) {
            emailService.setEmail(email);
            $location.path("/perfil/stats");
        };


        $scope.delete = function(i, u) {
            $http({
                url: '/api/user/',
                method: "DELETE",
                headers: {
                    'authorization': datos.token, user_id: datos.user,
                    "Content-Type": "application/json;charset=utf-8"
                },
                data: {email: u.email}
            }).then(function (response) {
                if (response.error > 0) {
                } else {
                    $scope.users.splice(i, 1);
                }
            });
        };

        var datos = TokenService.getSession();
        $scope.user = datos.user;

        $scope.users={};
        $http({
            url: '/api/user/',
            method: "GET",
            headers: { 'authorization': datos.token, user_id: datos.user}
        }).then(function (response) {
            if (response.error > 0) {
            } else {
                $scope.users = response.data.users;
            }
        });
    });