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
                controller: "loginContrfoller",
                templateUrl: "view/login.html"
            })
            .when("/register", {
                controller: "registerController",
                templateUrl: "views/register.html"
            })

    })