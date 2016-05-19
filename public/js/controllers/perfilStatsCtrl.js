/**
 * Autores: Rubén Gabás Celimendiz, Alejandro Solanas Bonilla, Daniel Uroz Hinarejos
 * NIAs: 590738, 647647, 545338
 * Proyecto: OPbird
 * Fichero:
 * Fecha: 19/5/2016
 * Funcion:
 */


angular.module("FinalApp")
    .controller('perfilStatsCtrl', function($scope, $http, $location, TokenService, emailService) {
        if (!TokenService.isSession()) {
            $location.path("/home");
        }
        var email = emailService.getEmail();

        $http({
            url: '/api/stats/' + email,
            method: "GET"
        }).then(function (response) {
            if (response.error > 0) {
            } else {
                $scope.tLabels = ["Publicados", "Programados"];
                $scope.tData = [response.data.total, response.data.totalProg];
            }
        });
    });