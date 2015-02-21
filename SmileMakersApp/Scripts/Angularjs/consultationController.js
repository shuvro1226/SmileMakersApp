/// <reference path="../angular.js" />
/// <reference path="module.js" />

app.controller("consultationController", function ($scope, $routeParams, $location, consultationService, treatmentService) {
    var id = $routeParams.id;
    var prescriptionID = $routeParams.pid;

    if (id === '0') {
        $scope.Update = false;
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
    } else {
        $scope.Update = true;
        var getConsultation = consultationService.getConsultation(id);
        getConsultation.then(function (pl) {
            $scope.consultation = pl.data[0];
            $scope.ConsultDate = $scope.consultation.consultation_date;
            $scope.AmountPaid = $scope.consultation.payment_recieved;
        }, function (errorPl) {
            $log.error('Error loading prescription data', errorPl);
        });
    }

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };
    $scope.dateOptions = {
        formatDate: 'dd-MM-yyyy'
    };
    $scope.format = 'dd-MM-yyyy';

    $scope.save = function () {
        if (typeof ($scope.ConsultDate) === "string" || $scope.ConsultDate instanceof String) {
            var saveDate = $scope.ConsultDate;
        } else {
            if (($scope.ConsultDate.getMonth() + 1) < 10 && $scope.ConsultDate.getDate() < 10) {
                var saveDate = "0" + $scope.ConsultDate.getDate() + "-0" + ($scope.ConsultDate.getMonth() + 1) + "-" + $scope.ConsultDate.getFullYear();
            } else if (($scope.ConsultDate.getMonth() + 1) < 10 && $scope.ConsultDate.getDate() >= 10) {
                var saveDate = $scope.ConsultDate.getDate() + "-0" + ($scope.ConsultDate.getMonth() + 1) + "-" + $scope.ConsultDate.getFullYear();
            } else if (($scope.ConsultDate.getMonth() + 1) >= 10 && $scope.ConsultDate.getDate() < 10) {
                var saveDate = "0" + $scope.ConsultDate.getDate() + "-" + ($scope.ConsultDate.getMonth() + 1) + "-" + $scope.ConsultDate.getFullYear();
            } else {
                var saveDate = $scope.ConsultDate.getDate() + "-" + ($scope.ConsultDate.getMonth() + 1) + "-" + $scope.ConsultDate.getFullYear();
            }
        }

        var Consultation = {
            prescription_id: prescriptionID,
            consultation_date: saveDate,
            payment_recieved: $scope.AmountPaid
        };
        
        
        var consultationResponse = consultationService.post(Consultation);
        consultationResponse.then(function (pl) {
            $scope.consultationid = pl.data.id;
            $location.path('/treatments/consultation/' + $scope.consultationid + '/prescription/' + prescriptionID);
        }, function (err) {
            console.log("Err" + err);
        });

    };

    $scope.update = function () {
        if (typeof ($scope.ConsultDate) === "string" || $scope.ConsultDate instanceof String) {
            var updateDate = $scope.ConsultDate;
        } else {
            if (($scope.ConsultDate.getMonth() + 1) < 10 && $scope.ConsultDate.getDate() < 10) {
                var updateDate = "0" + $scope.ConsultDate.getDate() + "-0" + ($scope.ConsultDate.getMonth() + 1) + "-" + $scope.ConsultDate.getFullYear();
            } else if (($scope.ConsultDate.getMonth() + 1) < 10 && $scope.ConsultDate.getDate() >= 10) {
                var updateDate = $scope.ConsultDate.getDate() + "-0" + ($scope.ConsultDate.getMonth() + 1) + "-" + $scope.ConsultDate.getFullYear();
            } else if (($scope.ConsultDate.getMonth() + 1) >= 10 && $scope.ConsultDate.getDate() < 10) {
                var updateDate = "0" + $scope.ConsultDate.getDate() + "-" + ($scope.ConsultDate.getMonth() + 1) + "-" + $scope.ConsultDate.getFullYear();
            } else {
                var updateDate = $scope.ConsultDate.getDate() + "-" + ($scope.ConsultDate.getMonth() + 1) + "-" + $scope.ConsultDate.getFullYear();
            }
        }

        var Consultation = {
            id: id,
            prescription_id: prescriptionID,
            consultation_date: updateDate,
            payment_recieved: $scope.AmountPaid
        };

        var consultationResponse = consultationService.put(id, Consultation);
        consultationResponse.then(function (pl) {
            $location.path('/treatments/consultation/' + id + '/prescription/' + prescriptionID);
        }, function (err) {
            console.log("Err" + err);
        });
    }
})