/// <reference path="../angular.js" />
/// <reference path="module.js" />

app.controller("showPrescriptionController", function ($scope, $routeParams, $location, prescriptionService, treatmentService) {
    var prescriptionId = $routeParams.id;
    var getPrescription = prescriptionService.getPrescription(prescriptionId);
    getPrescription.then(function (pl) {
        $scope.prescription = pl.data[0];
    }, function (errorPl) {
        $log.error('Error loading prescription data', errorPl);
    });
    
    $scope.addCharges = function () {
        $location.path('/charges/add/' + prescriptionId);
    }

    $scope.addConsultation = function () {
        $location.path('/consultation/0/prescription/' + prescriptionId);
    }

    $scope.updateConsultation = function (id) {
        $location.path('/consultation/' + id + '/prescription/' + prescriptionId);
    }

    $scope.updatePatient = function (id) {
        $location.path('/patient/update/' + id);
    }

    $scope.showPatient = function (id) {
        $location.path('/patientdetail/withid/' + id);
    }

    $scope.updatePatient = function (id) {
        $location.path('/patient/update/' + id);
    }

    $scope.updatePrescription = function (id) {
        $location.path('/prescription/update/' + id);
    }

    $scope.updateTreatment = function (id) {        
        $location.path('/treatments/prescription/' + id);
    }
})