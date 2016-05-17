angular.module("FinalApp")
    .controller('dashboardCtlr', function($scope, $http, $location, TokenService){
        //TokenService.cerrarSesion();
        if (!TokenService.isSession()) {
            $location.path("/home");
        }
        console.log("aaa");
        $scope.usuario = {};
        $scope.login = {};
        $scope.dentro = false;
        $scope.error = {};

        $scope.go = function ( path ) {
            $location.path( path );
        };

    })