angular.module("FinalApp")
    .controller('adminCtlr', function($scope, $http, $location, TokenService) {
        if (!TokenService.isSession()) {
            $location.path("/home");
        }

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