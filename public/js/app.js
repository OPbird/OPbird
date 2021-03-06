/**
 * Autores: Rubén Gabás Celimendiz, Alejandro Solanas Bonilla, Daniel Uroz Hinarejos
 * NIAs: 590738, 647647, 545338
 * Proyecto: OPbird
 * Fichero:
 * Fecha: 19/5/2016
 * Funcion:
 */


angular.module("FinalApp",[ "ngRoute", "LocalStorageModule", "ngSanitize", "chart.js", "xeditable", "ngAnimate"])
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
                templateUrl: "views/dashboard.html"
            })
            .when("/perfil",{
                controller: "perfilCtlr",
                templateUrl: "views/perfil.html"
            })
            .when("/perfil/stats",{
                controller: "perfilStatsCtrl",
                templateUrl: "views/perfilStats.html"
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