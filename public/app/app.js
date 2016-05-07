angular.module("FinalApp",["ngRoute"])
    .config(function($routeProvider) {
        console.log("op");
        $routeProvider
            .when("/", {
                controller: "MainController",
                templateUrl: "views/home.html"
            })
    })