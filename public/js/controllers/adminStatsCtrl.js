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
                $scope.pieLabels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
                $scope.pieData = [300, 500, 100];
            }
        });
        //Metodo GET
        $http({
            url: '/admin/stats/access',
            method: "GET"
        }).then(function (response) {
            if (response.error > 0) {
            } else {
                $scope.doughnutLabels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
                $scope.doughnutData = [300, 500, 100];
            }
        })
    });