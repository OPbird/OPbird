angular.module("FinalApp")
    .controller('MainController', function($scope, $http, $location){
        /*if (SessionService.isSession()) {
            $location.path("/dashboard");
        }*/
        console.log("aaa");
        $scope.usuario = {};
        $scope.login = {};
        $scope.dentro = false;
        $scope.error = {};



    })