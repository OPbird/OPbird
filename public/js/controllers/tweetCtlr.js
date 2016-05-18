angular.module("FinalApp")
    .controller('tweetCtlr', function($scope, $http, $location, TokenService){
        if (!TokenService.isSession()) {
            $location.path("/home");
        }



    })