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
            }
        });
        //Metodo GET
        $http({
            url: '/admin/stats/access',
            method: "GET"
        }).then(function (response) {
            if (response.error > 0) {
            } else {
                console.log("TODAY: " + response.data.todayAccess);
                console.log("THREE DAYS: "  + response.data.threeDaysAccess);
                console.log("WEEK: "  + response.data.weekAccess);
                console.log("MONTH: "  + response.data.monthAccess);
                console.log("BEYOND MONTH: "  + response.data.beyondMonth);
            }
        })
    });