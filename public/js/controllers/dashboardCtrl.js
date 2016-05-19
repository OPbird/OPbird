angular.module("FinalApp")
    .controller('dashboardCtlr', function($scope, $http, $location, TokenService, $sce){
               
        //TokenService.cerrarSesion();
        if (!TokenService.isSession()) {
            $location.path("/home");
        }

        console.log(Date.now());
        console.log(new Date(Date.now()).getTime());

        $scope.usuario = {};
        $scope.mostarTimelines = false;
        $scope.dentro = false;
        $scope.error = {};
        $scope.cuentas={};
        $scope.tuitasHome = {};
        $scope.tuitasUser = {};
        $scope.tuitasMention = {};
        $scope.tuitasFavorites = {};
        $scope.tuitasRetweets = {};
        $scope.textoTweet = "";
        $scope.url="";
        $scope.urlshort="";
        $scope.infoCuenta = {};
        
        var datos = TokenService.getSession();
        $scope.user = datos.user;

        $http({
            url: '/api/twitterAccount/' + datos.user,
            method: "GET",
            headers: {'authorization': datos.token, user_id: datos.user}
        }).then(function (response) {
            if (response.error > 0) {
            } else {
                $scope.cuentas = response.data.cuentas;
            }
        });

        $scope.go = function ( path ) {
            $location.path( path );
        };

        $scope.tweets = function (c) {
            console.log(c);
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
                    }, {
                        title: 'Mentions Timeline',
                        url: 'mentions'
                    }, {
                        title: 'Favorites Timeline',
                        url: 'favorites'
                    }, {
                        title: 'Retweets Timeline',
                        url: 'retweets'
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
                    $scope.tuitasMention = data.mentions_timeline;
                    $scope.tuitasFavorites = data.favorites_timeline;
                    $scope.tuitasRetweets = data.retweets_timeline;
                    $scope.infoCuenta = data.user_timeline[0].user;
                
                    $scope.mostarTimelines = true;
                    $scope.tweeetear = function (data) {
                        if (data.length > 0) {
                            console.log(data);
                            $http({
                                url: '/api/twitterAccount/tweet',
                                method: "POST",
                                data: {access_token: c.access_token,
                                        access_token_secret: c.access_token_secret,
                                        text: data},
                                headers: {'authorization': datos.token, user_id: datos.user}
                            }).success(function (response) {
                               $scope.textoTweet = "";
                            });
                        }
                    }
                })
                .error(function (data) {
                    console.log(data);
                });
        }

        $scope.short = function(data){
            if(data.length>0){
                console.log(data);
                $http({
                    url: '/api/short',
                    method: "POST",
                    data: {url: data},
                    headers: {'authorization': datos.token, user_id: datos.user}
                }).success(function (response) {
                    $scope.shortUrl=response.url;
                    $scope.url = "";
                });
            }
        }

        $scope.borrarCuenta = function (data) {
            $http({
                url: '/api/twitterAccount/' + datos.user + '/' + data.id_twitter,
                method: "delete",
                headers: {'authorization': datos.token, user_id: datos.user}
            }).success(function (data) {
                $scope.mostarTimelines = false;
                $scope.cuentas={};
                $scope.tuitasHome = {};
                $scope.tuitasUser = {};
                $scope.tuitasMention = {};
                $scope.tuitasFavorites = {};
                $scope.tuitasRetweets = {};
                $scope.textoTweet = "";
                $scope.infoCuenta = {};
                $http({
                    url: '/api/twitterAccount/' + datos.user,
                    method: "GET",
                    headers: {'authorization': datos.token, user_id: datos.user}
                }).then(function (response) {
                    if (response.error > 0) {
                    } else {
                        $scope.cuentas = response.data.cuentas;
                    }
                });
            }).error(function (data) {

            })
        }

        // $scope.getText = function (text) {
        //     var urlPattern = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
        //     var res = text.split(" ");
        //     var texto = "";
        //     for (var i = 0; i < res.length; i++) {
        //         if(res[i].match(urlPattern)) {
        //             res[i] = "<a target='_blank' href='" + res[i] + "'>" + res[i] + "</a>"
        //             console.log(res[i]);
        //         }
        //         texto += res[i] + " ";
        //     }
        //     return $sce.trustAsHtml(texto);
        // }



    })