'use strict';


var myApp = angular.module('myApp', ['ngRoute',
    'ngSanitize',
    'myApp.controllers',
    'myApp.directives',
    'myApp.services',
    'myApp.filters',
    'snap',
    'fhcloud'
]);

myApp.config(function($routeProvider,$httpProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'views/example.html',
            controller: 'MainCtrl'
        })
   $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common = { 
  "Access-Control-Allow-Origin": "*" ,
 "Access-Control-Allow-Headers": "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With",
 "Access-Control-Allow-Methods": "GET, PUT, POST",
 "Content-type": "application/json"

      };
});

