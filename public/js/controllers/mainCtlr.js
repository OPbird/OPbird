var addr = "http://localhost:8080";

angular.module("FinalApp")
    .controller('mainCtlr', function($scope, $http, $location, TokenService){
        if (TokenService.isSession()) {
            $location.path("/dashboard");
        }

        // $scope.usuario = {};
        // $scope.login = {};
        // $scope.dentro = false;
        $scope.error = {};
        // $scope.accounts = {};

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
        

        $scope.cerrarSesion = function () {
            TokenService.cerrarSesion();
            $location.path("/");
        };

    })