angular.module("FinalApp")
    .controller('adminStatsCtlr', function($scope, $http, $location, TokenService) {
        if (!TokenService.isSession()) {
            $location.path("/home");
        }
        //Metodo GET
        $http({
            url: '/admin/stats/accounts',
            method: "GET"
        }).then(function (response) {
            if (response.error > 0) {
            } else {
                $scope.pieLabels = ["Altas", "Bajas"];
                $scope.pieData = [response.data.ups, response.data.downs];
            }
        });
        //Metodo GET
        $http({
            url: '/admin/stats/access',
            method: "GET"
        }).then(function (response) {
            if (response.error > 0) {
            } else {
                $scope.doughnutLabels = ["Hoy", "3 días", "1 semanas", "1 mes", "Más de 1 mes"];
                $scope.doughnutData = [response.data.todayAccess, response.data.threeDaysAccess, response.data.weekAccess,
                    response.data.monthAccess, response.data.beyondMonth];
            }
        })
    });