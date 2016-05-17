angular.module("FinalApp",["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                controller: "loginController",
                templateUrl: "views/login.html"
            })
            .when("/register", {
                controller: "registerController",
                templateUrl: "views/register.html"
            })
    })