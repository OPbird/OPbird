angular.module("FinalApp")
    .controller('mainCtlr', function($scope, $http, $location, TokenService){
        if (TokenService.isSession()) {
            $location.path("/dashboard");
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