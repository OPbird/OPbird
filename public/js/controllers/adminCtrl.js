angular.module("FinalApp")
    .controller('adminCtlr', function($scope, $http, $location, TokenService){
        if (!TokenService.isSession()) {
            $location.path("/home");
        }
        $scope.users={};
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