angular.module("FinalApp")
    .controller('dashboardCtlr', function($scope, $http, $location, TokenService){
        //TokenService.cerrarSesion();
        if (!TokenService.isSession()) {
            $location.path("/home");
        }
        console.log("aaa");
        $scope.usuario = {};
        $scope.login = {};
        $scope.dentro = false;
        $scope.error = {};
        var datos = TokenService.getSession();
        $scope.user = datos.user;
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