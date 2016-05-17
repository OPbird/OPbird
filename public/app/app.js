angular.module("FinalApp",["ngRoute"])
    .config(function($routeProvider) {
        console.log("op");
        $routeProvider
            .when("/", {
                controller: "mainController",
                templateUrl: "views/home.html"
            })
    })