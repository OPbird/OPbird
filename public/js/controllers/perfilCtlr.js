angular.module("FinalApp")
    .controller('perfilCtlr', function($scope, $http, $location, TokenService, $sce){
        //TokenService.cerrarSesion();
        if (!TokenService.isSession()) {
            $location.path("/home");
        }

        console.log(Date.now());
        console.log(new Date(Date.now()).getTime());

        $scope.usuario = {};
        $scope.mostarTimelines = false;
        $scope.dentro = false;
        $scope.error = {};
        $scope.user = {};

        var datos = TokenService.getSession();
        $scope.user_id = datos.user;
        
        $http({
            url: '/api/user/' + datos.user,
            method: "GET",
            headers: {'authorization': datos.token, user_id: datos.user}
        })
        .success(function (data) {
            $scope.user = data.user;
        })
        .error(function (data) {
                console.log("error usuario no existe");
        });

    })
