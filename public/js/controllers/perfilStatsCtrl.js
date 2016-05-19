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