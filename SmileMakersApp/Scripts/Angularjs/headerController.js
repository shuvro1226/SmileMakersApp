/// <reference path="../angular.js" />
/// <reference path="module.js" />

app.controller("headerController", function ($scope, $location) {
    
    $scope.showPatient = function () {
        if ($scope.PatientContact.length !== 0) {
            $('#search-container').removeClass('open');
            $location.path('/patientdetail/withsearchterm/' + $scope.PatientContact);
            $scope.PatientContact = "";
        }
        
    }

    $scope.showPrescription = function () {
        if($scope.PrescriptionID.length !== 0){
            $('#search-container').removeClass('open');
            $location.path('/prescription/' + $scope.PrescriptionID);
            $scope.PrescriptionID = "";
        }
    }
})