var addr = "http://localhost:8080";

angular.module("FinalApp")
    .controller('mainCtlr', function($scope, $http, $location, TokenService){
        if (TokenService.isSession()) {
            $location.path("/dashboard");
        }
        
        $scope.error = {};

        if (TokenService.isSession) {
            var datos = TokenService.getSession();
            $scope.user = datos.user;
            $scope.admin = datos.admin;
        }

        $scope.go = function ( path ) {
            $location.path( path );
        };

        $scope.isLogged = function(){
            if(TokenService.isSession()){
                return true;
            }else{
                return false;
            }
        };

        $scope.isUser = function(){
            if(TokenService.isSession() && !$scope.admin){
                return true;
            }else{
                return false;
            }
        };

        $scope.isAdmin = function(){
            if(TokenService.isSession() && $scope.admin){
                return true;
            }else{
                return false;
            }
        };

        $scope.getAccounts = function() {
            $http({
                url: '/api/twitterAccount/' + datos.user,
                method: "GET"
            }).then(function (response) {
                if (response.error > 0) {
                } else {
                    console.log(response);
                    $scope.cuentas = response.cuentas
                }
            });
        }
        

        $scope.cerrarSesion = function () {
            TokenService.cerrarSesion();
            $location.path("/");
        };

    })