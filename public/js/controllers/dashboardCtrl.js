angular.module("FinalApp")
    .controller('dashboardCtlr', function($scope, $http, $location, TokenService){
               
        //TokenService.cerrarSesion();
        if (!TokenService.isSession()) {
            $location.path("/home");
        }        

        $scope.usuario = {};
        $scope.mostarTimelines = false;
        $scope.dentro = false;
        $scope.error = {};
        $scope.cuentas={};
        $scope.tuitasHome = {};
        $scope.tuitasUser = {};
        var datos = TokenService.getSession();
        $scope.user = datos.user;

        $http({
            url: '/api/twitterAccount/' + datos.user,
            method: "GET"
        }).then(function (response) {
            if (response.error > 0) {
            } else {
                console.log(response.data.cuentas);
                $scope.cuentas = response.data.cuentas;
            }
        });

        $scope.go = function ( path ) {
            $location.path( path );
        };

        $scope.tweets = function (c) {
            console.log(c);
            var datos = TokenService.getSession();
            console.log(datos);
            $http({
                method:"get",
                url: '/api/twitter/timelines/' + c.access_token + '/' + c.access_token_secret + '/' + c.id_twitter,
                headers: { 'authorization': datos.token, user_id: datos.user}})
                .success(function (data) {
                    console.log(data.tweets);
                    $scope.tabs = [{
                        title: 'Home Timeline',
                        url: 'home'
                    }, {
                        title: 'User Timeline',
                        url: 'user'
                    }];

                    $scope.currentTab = 'home';

                    $scope.onClickTab = function (tab) {
                        $scope.currentTab = tab.url;
                    }

                    $scope.isActiveTab = function(tabUrl) {
                        return tabUrl == $scope.currentTab;
                    }
                    $scope.tuitasHome = data.home_timeline;
                    $scope.tuitasUser = data.user_timeline

                    $scope.mostarTimelines = true;

                })
                .error(function (data) {
                    console.log(data);
                });
        }


    })