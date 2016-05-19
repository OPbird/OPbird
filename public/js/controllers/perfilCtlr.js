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
        $scope.cuentas={};

        var datos = TokenService.getSession();
        $scope.user = datos.user;



    })
