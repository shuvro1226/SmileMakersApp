/// <reference path="../angular.js" />

var app = angular.module("smileMakersModule", ['ngRoute']);

app.factory("ShareData", function () {
    return { value: 0 }
});

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/',
    {
        templateUrl: 'Home/Index',
        controller: ''
    }).when('/prescription/add',
    {
        templateUrl: 'Prescription/Create',
        controller: 'prescriptionController'
    }).when('/consultation/add',
    {
        templateUrl: 'Consultation/Create',
        controller: 'consultationController'
    }).otherwise(
    {
        redirectTo: '/'
    });
    // $locationProvider.html5Mode(true);
    $locationProvider.html5Mode(true).hashPrefix('!')
}]);