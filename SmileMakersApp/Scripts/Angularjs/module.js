/// <reference path="../angular.js" />

var app = angular.module("smileMakersModule", ['ngRoute', 'ui.bootstrap', 'nya.bootstrap.select']);

app.factory("ShareData", function () {
    return { value: 0 }
});

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/',
    {
        templateUrl: 'Home/Index'
    }).when('/prescription/:condition/:id',
    {
        templateUrl: 'Prescription/Create'
    }).when('/charges/add/:presid',
    {
        templateUrl: 'ConsultationCharges/Create'
    }).when('/treatments/:type/:id',
    {
        templateUrl: 'Treatments/Create'
    }).when('/treatments/:type/:id/prescription/:pid',
    {
        templateUrl: 'Treatments/Create'
    }).when('/consultation/:id/prescription/:pid',
    {
        templateUrl: 'Consultation/Create'
    }).when('/patient/:condition/:id',
    {
        templateUrl: 'Patients/Create'
    }).when('/prescription/:id',
    {
        templateUrl: 'Prescription/Details'
    }).when('/patient/:id',
    {
        templateUrl: 'Patients/Index'
    }).when('/appointment/:id',
    {
        templateUrl: 'Appointments/Create'
    }).otherwise(
    {
        redirectTo: '/'
    });
    // $locationProvider.html5Mode(true);
    $locationProvider.html5Mode(true).hashPrefix('!')
}]);