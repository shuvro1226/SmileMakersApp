/// <reference path="../angular.js" />
/// <reference path="module.js" />

app.controller("showAppointmentsController", function ($scope, prescriptionService) {
    console.log("Controller Accessed");
    var getPrescriptions = prescriptionService.getPrescriptions();
    getPrescriptions.then(function (pl) { $scope.Prescription = pl.data },
              function (errorPl) {
                  $log.error('failure loading Employee', errorPl);
              });
    console.log($scope.Prescription);
});