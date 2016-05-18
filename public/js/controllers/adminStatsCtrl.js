angular.module("FinalApp")
    .controller('adminCtlr', function($scope, $http, $location, TokenService) {
        if (!TokenService.isSession()) {
            $location.path("/home");
        }

        //Metodo GET
        $http({
            url: '/api/twitterAccount/' + datos.user,
            method: "GET",
            headers: {'authorization': datos.token, user_id: datos.user}
        }).then(function (response) {
            if (response.error > 0) {
            } else {
                console.log(response.data.cuentas);
                $scope.cuentas = response.data.cuentas;
            }
        });


    }