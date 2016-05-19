angular.module("FinalApp")
    .controller('adminCtlr', function($scope, $http, $location, TokenService, emailService) {
        if (!TokenService.isSession()) {
            $location.path("/home");
        }

        $scope.edit = function(email) {
            console.log(email);
        };

        $scope.info = function(email) {
            emailService.setEmail(email);
            $location.path("/perfil/stats");
        };

        $scope.delete = function(email) {
            console.log(email);
        };

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