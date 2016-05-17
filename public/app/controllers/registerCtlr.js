angular.module("FinalApp")
    .controller('registerController', function($scope, $http, $location){
        /*if (SessionService.isSession()) {
         $location.path("/dashboard");
         }*/
        console.log("aaa");
        $scope.user = {};
        $scope.registrar = true;
        $scope.error = {};
        $scope.datosConexion = {};
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
                    $scope.datosConexion.email = data.user.email;
                    $scope.datosConexion.password = data.user.password;
                    $scope.registrar = false;
                    console.log(data);
                })
                .error(function (data) {
                    $scope.error.registrar = true;
                    console.log(data);
                });
        }
    })