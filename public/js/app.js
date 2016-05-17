angular.module("FinalApp",["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                controller: "mainController",
                templateUrl: "views/home.html"
            })
            .when("/home", {
                controller: "mainController",
                templateUrl: "views/home.html"
            })
            .when("/login",{
                controller: "loginController",
                templateUrl: "views/login.html"
            })
            .when("/register", {
                controller: "registerController",
                templateUrl: "views/register.html"
            })
            .otherwise({redirectTo: "/"});

    })