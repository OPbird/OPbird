angular.module("FinalApp")
    .controller('registerController', function($scope, $http, $location){
        /*if (SessionService.isSession()) {
         $location.path("/dashboard");
         }*/
        console.log("aaa");
        $scope.user = {};
        $scope.login = {};
        $scope.dentro = false;
        $scope.error = {};
        //$location.path("/register");

        $scope.go = function ( path ) {
            $location.path( path );
        };

        $scope.register = function () {
            console.log($scope.user);
        }
    })