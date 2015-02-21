/// <reference path="../angular.js" />
/// <reference path="module.js" />

app.controller("prescriptionController", function ($scope, $routeParams, $log, $location, prescriptionService, patientService, treatmentService) {
    var id = $routeParams.id;
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
        $scope.date = day + "-" + month + "-" + year;

        return patientService.getPatients().then(function (pl) {
            $scope.patients = pl.data;
            return $scope.patients;
        },
        function (errorPl) {
            //$scope.AppointmentFound = false;
        });
    } else {
        $scope.Update = true;
        var getPrescription = prescriptionService.getPrescription(id);
        getPrescription.then(function (pl) {
            $scope.prescription = pl.data[0];
            $scope.Patient = $scope.prescription.Patient[0].name;
            $scope.PatientID = $scope.prescription.Patient[0].id;
            $scope.date = $scope.prescription.prescription_date;
            //var appointment_date = $scope.prescription.appointment_date;
            //var pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
            //$scope.AppointmentDate = new Date(appointment_date.replace(pattern, '$3-$2-$1'));
            //console.log($scope.AppointmentDate);
            $scope.OralExam = $scope.prescription.oral_examination;
            $scope.MedHistory = $scope.prescription.medical_history;
            $scope.Investigation = $scope.prescription.investigation;
            $scope.Advice = $scope.prescription.advice;
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
        if (typeof ($scope.date) === "string" || $scope.date instanceof String) {
            var saveDate = $scope.date;
        } else {
            if (($scope.date.getMonth() + 1) < 10 && $scope.date.getDate() < 10) {
                var saveDate = "0" + $scope.date.getDate() + "-0" + ($scope.date.getMonth() + 1) + "-" + $scope.date.getFullYear();
            } else if (($scope.date.getMonth() + 1) < 10 && $scope.date.getDate() >= 10) {
                var saveDate = $scope.date.getDate() + "-0" + ($scope.date.getMonth() + 1) + "-" + $scope.date.getFullYear();
            } else if (($scope.date.getMonth() + 1) >= 10 && $scope.date.getDate() < 10) {
                var saveDate = "0" + $scope.date.getDate() + "-" + ($scope.date.getMonth() + 1) + "-" + $scope.date.getFullYear();
            } else {
                var saveDate = $scope.date.getDate() + "-" + ($scope.date.getMonth() + 1) + "-" + $scope.date.getFullYear();
            }
        }        

        var Prescription = {
            patient_id: $scope.PatientID.id,
            prescription_date: saveDate,
            oral_examination: $scope.OralExam,
            medical_history: $scope.MedHistory,
            investigation: $scope.Investigation,
            advice: $scope.Advice
        };

        var prescriptionResponse = prescriptionService.post(Prescription);
        prescriptionResponse.then(function (pl) {
            $scope.prescriptionid = pl.data.id;
            $location.path('/treatments/prescription/' + $scope.prescriptionid);
        }, function (err) {
            console.log("Err" + err);
        });                
    };

    $scope.update = function () {
        if (typeof ($scope.date) === "string" || $scope.date instanceof String) {
            var updateDate = $scope.date;
        } else {
            if (($scope.date.getMonth() + 1) < 10 && $scope.date.getDate() < 10) {
                var updateDate = "0" + $scope.date.getDate() + "-0" + ($scope.date.getMonth() + 1) + "-" + $scope.date.getFullYear();
            } else if (($scope.date.getMonth() + 1) < 10 && $scope.date.getDate() >= 10) {
                var updateDate = $scope.date.getDate() + "-0" + ($scope.date.getMonth() + 1) + "-" + $scope.date.getFullYear();
            } else if (($scope.date.getMonth() + 1) >= 10 && $scope.date.getDate() < 10) {
                var updateDate = "0" + $scope.date.getDate() + "-" + ($scope.date.getMonth() + 1) + "-" + $scope.date.getFullYear();
            } else {
                var updateDate = $scope.date.getDate() + "-" + ($scope.date.getMonth() + 1) + "-" + $scope.date.getFullYear();
            }
        }

        var Prescription = {
            id: id,
            patient_id: $scope.PatientID,
            prescription_date: updateDate,
            oral_examination: $scope.OralExam,
            medical_history: $scope.MedHistory,
            investigation: $scope.Investigation,
            advice: $scope.Advice
        };

        var prescriptionResponse = prescriptionService.put(id, Prescription);
        prescriptionResponse.then(function (pl) {
            $location.path('/treatments/prescription/' + id);
        }, function (err) {
            console.log("Err" + err);
        });
    }      
})