angular.module("FinalApp")
    .controller('adminStatsCtlr', function($scope, $http, $location, TokenService) {
        if (!TokenService.isSession()) {
            $location.path("/home");
        }
        $scope.change = function() {
            $scope.type = $scope.type === 'Line' ?
                'Bar' : 'Line';
        };

        //Metodo GET
        $http({
            url: '/admin/stats/accounts',
            method: "GET"
        }).then(function (response) {
            if (response.error > 0) {
            } else {
                $scope.type = 'Line';
                $scope.abLabels = ["Altas", "Bajas"];
                $scope.abData = [response.data.totales.altas, response.data.totales.bajas];
                //afluencia
                $scope.abaLabels = ["Más de 1 mes", "1 mes", "1 semanas", "Hoy"];
                $scope.abaSeries = ['Altas', 'Bajas'];
                $scope.abaData = [
                    [response.data.altas.masMes, response.data.altas.mes, response.data.altas.semana, response.data.altas.hoy],
                    [response.data.bajas.masMes, response.data.bajas.mes, response.data.bajas.semana, response.data.bajas.hoy]
                ];
            }
        });
        //Metodo GET
        $http({
            url: '/admin/stats/access',
            method: "GET"
        }).then(function (response) {
            if (response.error > 0) {
            } else {
                $scope.uaLabels = ["Hoy", "3 días", "1 semanas", "1 mes", "Más de 1 mes"];
                $scope.uaData = [response.data.todayAccess, response.data.threeDaysAccess, response.data.weekAccess,
                    response.data.monthAccess, response.data.beyondMonth];
            }
        })
    });