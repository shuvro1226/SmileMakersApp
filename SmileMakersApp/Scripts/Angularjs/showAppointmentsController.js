/// <reference path="../angular.js" />
/// <reference path="module.js" />

app.controller("showAppointmentsController", function ($scope, $location, appointmentService) {

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
    $scope.selectedDate = date;
    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };
    $scope.dateOptions = {
        formatDate: 'dd-MM-yyyy'
    };
    $scope.format = 'dd-MM-yyyy';   
    

    var getPrescriptions = appointmentService.getPrescriptions(date);
    getPrescriptions.then(function (pl) {
        $scope.appointments = pl.data;
        if ($scope.appointments != "") {
            $scope.AppointmentFound = true;
        } else {
            $scope.AppointmentFound = false;
        }
        
    },
    function (errorPl) {
        $scope.AppointmentFound = false;
    });

    $scope.dateChanged = function () {
        if (($scope.date.getMonth() + 1) < 10 && $scope.date.getDate() < 10) {
            $scope.selectedDate = "0" + $scope.date.getDate() + "-0" + ($scope.date.getMonth() + 1) + "-" + $scope.date.getFullYear();
        } else if (($scope.date.getMonth() + 1) < 10 && $scope.date.getDate() >= 10) {
            $scope.selectedDate = $scope.date.getDate() + "-0" + ($scope.date.getMonth() + 1) + "-" + $scope.date.getFullYear();
        } else if (($scope.date.getMonth() + 1) >= 10 && $scope.date.getDate() < 10) {
            $scope.selectedDate = "0" + $scope.date.getDate() + "-" + ($scope.date.getMonth() + 1) + "-" + $scope.date.getFullYear();
        } else {
            $scope.selectedDate = $scope.date.getDate() + "-" + ($scope.date.getMonth() + 1) + "-" + $scope.date.getFullYear();
        }
        

        var getPrescriptions = appointmentService.getPrescriptions($scope.selectedDate);
        getPrescriptions.then(function (pl) {
            $scope.appointments = pl.data;
            if ($scope.appointments != "") {
                $scope.AppointmentFound = true;
            } else {
                $scope.AppointmentFound = false;
            }
        },
        function (errorPl) {
            $scope.AppointmentFound = false;
        });
    }

    $scope.updateAppointment = function (id) {
        $location.path('/appointment/' + id);
    }
});