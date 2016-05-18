angular.module("FinalApp")
    .controller('mainCtlr', function($scope, $http, $location, TokenService){
        if (TokenService.isSession()) {
            $location.path("/dashboard");
        }

        $scope.usuario = {};
        $scope.login = {};
        $scope.dentro = false;
        $scope.error = {};
        
        $scope.go = function ( path ) {
            $location.path( path );
        };

        $scope.notLogged = function(){
            if(TokenService.isSession()){
                return true;
            }else{
                return false;
            }
        }

    })