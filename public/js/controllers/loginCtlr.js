angular.module("FinalApp")
    .controller('loginCtlr', function($scope, $http, $location){

        $scope.login = {};
        $scope.error = {};

        $scope.go = function ( path ) {
            $location.path( path );
        };

        $scope.loger = function () {
            console.log($scope.login);
            $http.post('/api/login',
                JSON.stringify($scope.login),
                {
                    'Content-Type': 'application/json'
                })
                .success(function (data) {
                    // $scope.datosConexion.email = data.user.email;
                    // $scope.datosConexion.password = data.user.password;
                    // $scope.registrar = false;
                    console.log(data);
                })
                .error(function (data) {
                    // $scope.error.registrar = true;
                    console.log(data);
                });
        }
    })