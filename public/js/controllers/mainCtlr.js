var addr = "http://localhost:8080";

angular.module("FinalApp")
    .controller('mainCtlr', function($scope, $http, $location, TokenService){
        if (TokenService.isSession()) {
            $location.path("/dashboard");
        }

        $scope.usuario = {};
        $scope.login = {};
        $scope.dentro = false;
        $scope.error = {};
        $scope.accounts = {};

        if (TokenService.isSession) {
            var datos = TokenService.getSession();
            $scope.user = datos.user;
        }

        $scope.go = function ( path ) {
            $location.path( path );
        };

        $scope.notLogged = function(){
            if(TokenService.isSession()){
                return true;
            }else{
                return false;
            }
        };

        $scope.getAccounts = function(){
            if(TokenService.isSession()) {
                $http({
                    url: addr + '/api/twitterAccount/',
                    method: "GET",
                    params: {user : datos.user}
                }).then(function (response) {
                    if (response.error > 0) {
                    } else {
                        $scope.accounts = response.cuentas
                    }
                });
            }
        };

        $scope.cerrarSesion = function () {
            TokenService.cerrarSesion();
            $location.path("/");
        };

    })