angular.module("FinalApp",["ngRoute", "LocalStorageModule"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                controller: "mainCtlr",
                templateUrl: "views/home.html"
            })
            .when("/home", {
                controller: "mainCtlr",
                templateUrl: "views/home.html"
            })
            .when("/login",{
                controller: "loginCtlr",
                templateUrl: "views/login.html"
            })
            .when("/register", {
                controller: "registerCtlr",
                templateUrl: "views/register.html"
            })
            .when("/dashboard",{
                controller: "dashboardCtlr",
                templateUrl: "views/dashboard"
            })
            .otherwise({redirectTo: "/"});

    })