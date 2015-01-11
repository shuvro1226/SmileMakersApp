/// <reference path="../angular.js" />
/// <reference path="module.js" />

app.controller("showAppointmentsController", function ($scope, prescriptionService) {

    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    };
    var day = d.getDate();
    if (day < 10) {
        day = "0" + day;
    };
    
    var date = day + "-" + month + "-" + year;
    $scope.date = date;

    var getPrescriptions = prescriptionService.getPrescriptions(date);
    getPrescriptions.then(function (pl) { $scope.appointments = pl.data },
              function (errorPl) {
                  $log.error('failure loading Employee', errorPl);
              });

    $scope.dateChanged = function () {
        var getPrescriptions = prescriptionService.getPrescriptions($scope.date);
        getPrescriptions.then(function (pl) { $scope.appointments = pl.data },
                  function (errorPl) {
                      $log.error('failure loading Employee', errorPl);
                  });
    }
});