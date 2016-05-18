angular.module("FinalApp",[ "ngRoute", "LocalStorageModule"])
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
            .when("/dashboard/tweets",{
                controller: "tweetCtlr",
                templateUrl: "views/tweets.html"
            })
            .when("/dashboard",{
                controller: "dashboardCtlr",
                templateUrl: "views/dashboard.html"
            })
            .when("/hashtags",{
                controller: "hashtagsCtlr",
                templateUrl: "views/hashtags.html"
            })
            .when("/admin",{
                controller: "adminCtlr",
                templateUrl: "views/admin.html"
            })
            .when("/admin/stats",{
                controller: "adminStatsCtlr",
                templateUrl: "views/adminStats.html"
            })
            .otherwise({redirectTo: "/"});

    })