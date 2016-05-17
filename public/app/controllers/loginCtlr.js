angular.module("FinalApp")
    .controller('loginController', function($scope, $http, $location){
        /*if (SessionService.isSession()) {
         $location.path("/dashboard");
         }*/
        $scope.usuario = {};
        $scope.login = {};
        $scope.dentro = false;
        $scope.error = {};

        $scope.go = function ( path ) {
            $location.path( path );
        };

    })