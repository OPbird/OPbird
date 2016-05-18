var addr = "http://localhost:8080";


angular.module("FinalApp")
    .controller('loginCtlr', function($scope, $http, $location, TokenService) {

            if (TokenService.isSession()) {
                if(TokenService.getSession().admin){$location.path("/admin");}
                else {$location.path("/dashboard")}
            }
            $scope.login = {};
            $scope.error = {};

            $scope.go = function (path) {
                $location.path(path);
            };

            $scope.loger = function () {
                console.log($scope.login);
                $http.post('/api/login',
                    JSON.stringify($scope.login),
                    {
                        'Content-Type': 'application/json'
                    })
                    .success(function (data) {
                        TokenService.registrar(data);
                        if(TokenService.getSession().admin){$location.path("/admin");}
                        else {$location.path("/dashboard")}
                    })
                    .error(function (data) {
                        $scope.error.login = true;
                        console.log("Login nok");
                    });
            }
        })
