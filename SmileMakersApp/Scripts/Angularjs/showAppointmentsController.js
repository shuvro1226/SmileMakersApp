/// <reference path="../angular.js" />
/// <reference path="module.js" />

app.controller("showAppointmentsController", function ($scope, prescriptionService) {
    console.log("Controller Accessed");
    $scope.Prescription = prescriptionService.getPrescriptions();
});