angular.module("FinalApp")
    .controller('registerController', function($scope, $http, $location){
        /*if (SessionService.isSession()) {
         $location.path("/dashboard");
         }*/
        console.log("aaa");
        $scope.user = {};
        $scope.registrar = true;
        $scope.error = {};
        //$location.path("/register");

        $scope.go = function ( path ) {
            $location.path( path );
        };

        $scope.register = function () {
            console.log($scope.user);
            $http.post('/api/register',
                JSON.stringify($scope.user),
                {
                    'Content-Type': 'application/json'
                })
                .success(function (data) {
                    console.log(data);
                })
                .error(function (data) {
                    console.log(data);
                });
        }
    })