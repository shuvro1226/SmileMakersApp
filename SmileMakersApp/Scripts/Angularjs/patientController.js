/// <reference path="../angular.js" />
/// <reference path="module.js" />

app.controller("patientController", function ($scope, $routeParams, $log, $location, patientService) {
    var type = "", searchTerm = "";
    $scope.PatientSelected = false;
    var patientid = $scope.ContactNumber = $routeParams.id;
    if ($routeParams.condition !== null || $routeParams.condition !== "") {
        type = $routeParams.condition;
    }
    if ($routeParams.searchterm !== null || $routeParams.searchterm !== "") {
        searchTerm = $routeParams.searchterm;
    }
    if (searchTerm == "withsearchterm") {
        var getPatient = patientService.getPatientByContact(patientid);
        getPatient.then(function (pl) {
            $scope.patientDetails = pl.data;
            $scope.PatientStatus = "Patients matching searchterm '" + patientid + "'";
        }, function (errorPl) {
            $log.error('Error loading prescription data', errorPl);
        });
    } else {
        var getPatient = patientService.getPatient(patientid);
        getPatient.then(function (pl) {
            $scope.patientDetails = pl.data;
            $scope.PatientStatus = "Patient details.";
        }, function (errorPl) {
            $log.error('Error loading prescription data', errorPl);
        });
    }
    

    if (patientid !== '0') {
        if (type === 'update') {
            $scope.Update = true;
            var getPatient = patientService.getPatient(patientid);
            getPatient.then(function (pl) {
                $scope.patientDetails = pl.data;
                $scope.PatientName = $scope.patientDetails[0].name;
                $scope.PatientAge = $scope.patientDetails[0].age;
                $scope.PatientContact = $scope.patientDetails[0].contact;
                $scope.PatientAddress = $scope.patientDetails[0].address;
            }, function (errorPl) {
                $log.error('Error loading prescription data', errorPl);
            });
        }        
    } else {
        if (type === 'add') {
            $scope.Update = false;
            //var getPatient = patientService.getPatient(patientid);
            //getPatient.then(function (pl) {
            //    $scope.patientDetails = pl.data;
            //}, function (errorPl) {
            //    $log.error('Error loading prescription data', errorPl);
            //});
        }        
    }

    $scope.save = function () {
        var Patient = {
            name: $scope.PatientName,
            age: $scope.PatientAge,
            contact: $scope.PatientContact,
            address: $scope.PatientAddress
        };
        patientService.post(Patient);
        $location.path('/patient/' + $scope.PatientContact);
    }

    $scope.update = function () {
        var Patient = {
            id: $scope.patientDetails[0].id,
            name: $scope.PatientName,
            age: $scope.PatientAge,
            contact: $scope.PatientContact,
            address: $scope.PatientAddress
        };
        patientService.put($scope.patientDetails[0].id, Patient);
        $location.path('/patient/' + $scope.PatientContact);
    }

    $scope.updatePatient = function (id) {
        $location.path('/patient/update/' + id);
    }

    $scope.showPrescription = function (id) {
        $location.path('/prescription/' + id);
    }

    $scope.updatePrescription = function (id) {
        $location.path('/prescription/update/' + id);
    }

    $scope.saveAndAdd = function () {
        var Patient = {
            name: $scope.PatientName,
            age: $scope.PatientAge,
            contact: $scope.PatientContact,
            address: $scope.PatientAddress
        };
        patientService.post(Patient);
        $location.path('/appointment/0');
    }

    $scope.updateAndAdd = function () {
        var Patient = {
            id: $scope.patientDetails[0].id,
            name: $scope.PatientName,
            age: $scope.PatientAge,
            contact: $scope.PatientContact,
            address: $scope.PatientAddress
        };
        patientService.put($scope.patientDetails[0].id, Patient);
        $location.path('/appointment/0');
    }

    $scope.showPrescriptions = function (id, name) {
        var getPatient = patientService.getPatient(id);
        getPatient.then(function (pl) {
            $scope.patientPrescriptions = pl.data[0].Prescriptions;
            $scope.PatientSelected = true;
            $scope.Name = name;
        }, function (errorPl) {
            $log.error('Error loading prescription data', errorPl);
        });        
    }
})