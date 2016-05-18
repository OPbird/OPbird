angular.module("FinalApp")
    .controller('tweetCtlr', function($scope, $http, $location, TokenService){
        if (!TokenService.isSession()) {
            $location.path("/home");
        }
        $http({
            url: '/api/user/',
            method: "GET"
        }).then(function (response) {
            if (response.error > 0) {
            } else {
                $scope.users = response.users
            }
        });

    })