angular.module("FinalApp",[ "ngRoute", "LocalStorageModule"])
    .config(function($routeProvider, $httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

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
                templateUrl: "views/dashboard.html"
            })
            .otherwise({redirectTo: "/"});

    })