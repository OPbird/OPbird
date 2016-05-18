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
                console.log("UPS: " + response.data.ups);
                console.log("DOWNS: "  + response.data.downs);
                $scope.ups = response.data.ups;
                $scope.downs = response.data.downs;
            }
        })
    });