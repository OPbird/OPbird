
angular.module("FinalApp")
//TokenService.cerrarSesion();
.controller('hashtagsCtlr', function($scope, $http, $location, TokenService, $timeout){
    if (!TokenService.isSession()) {
        $location.path("/home");
    }
    var user = {};

    var datos = TokenService.getSession();
    var cuenta = {};

    $scope.usuario = {};
    $scope.mostarTimelines = false;
    $scope.error = {};
    $scope.user = {};
    $scope.hashtags = {};
    $scope.tuita = {};
    $scope.passNueva = "";
    $scope.hassss = "";

    $scope.user_id = datos.user;
    $http({
        url: '/api/user/' + datos.user,
        method: "GET",
        headers: {'authorization': datos.token, user_id: datos.user}
    })
    .success(function (data) {
        if (data.user.cuentas.length < 1) {
            $location.path("/dashboard");
        } else {
            $scope.user = data.user;
            cuenta = data.user.cuentas[0];
            //console.log(cuenta);
        }
    })
    .error(function (data) {
            console.log("error usuario no existe");
    });


    $http({
        url: '/api/hashtag',
        method: "GET",
        headers: {'authorization': datos.token, user_id: datos.user}
    })
    .success(function (data) {
        $scope.hashtags = data.hashtags;
    })
    .error(function (data) {
        console.log("error usuario no existe");
    });

    $scope.hashtagSelected = function (hash) {
        hash = hash.replace("#", "%23");
        $http({
            method:"get",
            url: '/api/twitter/timelinesHashtag/' + cuenta.access_token + '/' + cuenta.access_token_secret + '/' + hash,
            headers: { 'authorization': datos.token, user_id: datos.user}})
            .success(function (data) {
                $scope.tuita = data.hashahaha.statuses;
                $scope.mostarTimelines = true;
                $scope.hassss = hash;
            })
    }

    $scope.addHashTag = function (hashtag) {
        if (hashtag.length > 0) {
            if(hashtag.indexOf("#") == 0) {
                hashtag = hashtag.substr(1,hashtag.length - 1);
            }
            $http({
                url: '/api/hashtag',
                method: "post",
                data: {hashtag: hashtag},
                headers: {'authorization': datos.token, user_id: datos.user}
            })
            .success(function (data) {
                $scope.hashtags = data.hashtags;
                console.log("las contrasenias coinciden");
                $scope.error.noCoincide = 0;
            })
            .error(function (data) {
                $scope.error.noCoincide = 1;
                console.log("las contrasenias no coinciden");

            });
        }
    }

    $scope.borrarHashtag = function (hash) {
        $http({
            url: '/api/hashtag/' + datos.user + '/' + hash,
            method: "delete",
            headers: {'authorization': datos.token, user_id: datos.user}
        }).success(function (data) {
            $scope.hashtags = data.hashtag;
            $scope.mostarTimelines = false;
        }).error(function (data) {

        })
    }
})
