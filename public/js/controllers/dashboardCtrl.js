var addr = "http://localhost:8080";

angular.module("FinalApp")
    .controller('dashboardCtlr', function($scope, $http, $location, TokenService){
               
        //TokenService.cerrarSesion();
        if (!TokenService.isSession()) {
            $location.path("/home");
        }        

        $scope.usuario = {};
        $scope.login = {};
        $scope.dentro = false;
        $scope.error = {};
        $scope.cuentas={};
        
        var datos = TokenService.getSession();
        $scope.user = datos.user;

        $http({
            url: addr + '/api/twitterAccount/',
            method: "GET",
            params: {user : datos.user}
        }).then(function (response) {
            if (response.error > 0) {
            } else {
                $scope.cuentas = response.cuentas
            }
        });

        $scope.go = function ( path ) {
            $location.path( path );
        };
        
        /*$scope.signInTwitter = function () {
            var datos = TokenService.getSession();
            console.log(datos);
            $http({
                method:"get",
                url: '/auth/prueba',
                headers: { 'authorization': datos.token, user_id: datos.user,"Access-Control-Allow-Origin" : "*",
                    "Access-Control-Allow-Headers": "X-Requested-With, Content-Type",
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'}})
                .success(function (data) {
                    console.log(data);
                })
                .error(function (data) {
                    console.log(data);
                });
        }*/

    })