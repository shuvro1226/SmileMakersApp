/// <reference path="../angular.js" />
/// <reference path="module.js" />

app.controller("treatmentsController", function ($scope, $routeParams, $location, treatmentService) {
    $scope.Update = false;
    var type = $routeParams.type;
    var id = $routeParams.id;
    if ($routeParams.pid !== "") {
        var pid = $routeParams.pid;
    }

    if (type === "prescription") {
        $scope.Prescription = true;
        loadPrescribedTreatments();
    } else {
        $scope.Prescription = false;
        loadConsultedTreatments();
    }

    $scope.teethUR = [{ id: 1, checked: false }, { id: 2, checked: false }, { id: 3, checked: false }, { id: 4, checked: false }, { id: 5, checked: false }, { id: 6, checked: false }, { id: 7, checked: false }, { id: 8, checked: false }];
    $scope.upperRight = function () {
        $scope.URSelected = "";
        for (var i = 0; i < $scope.teethUR.length; i++) {
            if ($scope.teethUR[i].checked == true) {
                if ($scope.URSelected == "") {
                    $scope.URSelected = $scope.teethUR[i].id;
                } else {
                    $scope.URSelected = $scope.URSelected + "," + $scope.teethUR[i].id;
                }
            }
        }
    }

    $scope.teethUL = [{ id: 1, checked: false }, { id: 2, checked: false }, { id: 3, checked: false }, { id: 4, checked: false }, { id: 5, checked: false }, { id: 6, checked: false }, { id: 7, checked: false }, { id: 8, checked: false }];
    $scope.upperLeft = function () {
        $scope.ULSelected = "";
        for (var i = 0; i < $scope.teethUL.length; i++) {
            if ($scope.teethUL[i].checked == true) {
                if ($scope.ULSelected == "") {
                    $scope.ULSelected = $scope.teethUL[i].id;
                } else {
                    $scope.ULSelected = $scope.ULSelected + "," + $scope.teethUL[i].id;
                }
            }
        }
    }

    $scope.teethLR = [{ id: 1, checked: false }, { id: 2, checked: false }, { id: 3, checked: false }, { id: 4, checked: false }, { id: 5, checked: false }, { id: 6, checked: false }, { id: 7, checked: false }, { id: 8, checked: false }];
    $scope.lowerRight = function () {
        $scope.LRSelected = "";
        for (var i = 0; i < $scope.teethLR.length; i++) {
            if ($scope.teethLR[i].checked == true) {
                if ($scope.LRSelected == "") {
                    $scope.LRSelected = $scope.teethLR[i].id;
                } else {
                    $scope.LRSelected = $scope.LRSelected + "," + $scope.teethLR[i].id;
                }
            }
        }
    }

    $scope.teethLL = [{ id: 1, checked: false }, { id: 2, checked: false }, { id: 3, checked: false }, { id: 4, checked: false }, { id: 5, checked: false }, { id: 6, checked: false }, { id: 7, checked: false }, { id: 8, checked: false }];
    $scope.lowerLeft = function () {
        $scope.LLSelected = "";
        for (var i = 0; i < $scope.teethLL.length; i++) {
            if ($scope.teethLL[i].checked == true) {
                if ($scope.LLSelected == "") {
                    $scope.LLSelected = $scope.teethLL[i].id;
                } else {
                    $scope.LLSelected = $scope.LLSelected + "," + $scope.teethLL[i].id;
                }
            }
        }
    }

    var treatments = treatmentService.getTreatments(); //The MEthod Call from service
    treatments.then(function (pl) { $scope.treatments = pl.data },
          function (errorPl) {
              $log.error('Error loading treatments', errorPl);
          });

    $scope.addTreatmentDetails = function () {
        if (type === "prescription") {
            var Treatment = {
                prescription_id: id,
                treatment_id: $scope.selectedTreatment.id,
                upper_left: $scope.ULSelected,
                upper_right: $scope.URSelected,
                lower_left: $scope.LLSelected,
                lower_right: $scope.LRSelected
            }
            var treatmentsResponse = treatmentService.postPrescribedTreatment(Treatment);
            treatmentsResponse.then(function (pl) {
                loadPrescribedTreatments();
                clearFields();
            }, function (err) {
                console.log("Err" + err);
            });
        } else {
            var Treatment = {
                consultation_id: id,
                treatment_id: $scope.selectedTreatment.id,
                upper_left: $scope.ULSelected,
                upper_right: $scope.URSelected,
                lower_left: $scope.LLSelected,
                lower_right: $scope.LRSelected
            }
            var treatmentsResponse = treatmentService.postConsultedTreatment(Treatment);
            treatmentsResponse.then(function (pl) {
                loadConsultedTreatments();
                clearFields();
            }, function (err) {
                console.log("Err" + err);
            });
        }
    }

    $scope.updateTreatmentDetails = function () {
        if (type === "prescription") {
            var Treatment = {
                id: $scope.treatmentid,
                prescription_id: id,
                treatment_id: $scope.selectedTreatment.id,
                upper_left: $scope.ULSelected,
                upper_right: $scope.URSelected,
                lower_left: $scope.LLSelected,
                lower_right: $scope.LRSelected
            }
            var treatmentsResponse = treatmentService.putPrescribedTreatment($scope.treatmentid, Treatment);
            treatmentsResponse.then(function (pl) {
                $scope.Update = false;
                loadPrescribedTreatments();
                clearFields();
            }, function (err) {
                console.log("Err" + err);
            });
        } else {
            var Treatment = {
                id: $scope.treatmentid,
                consultation_id: id,
                treatment_id: $scope.selectedTreatment.id,
                upper_left: $scope.ULSelected,
                upper_right: $scope.URSelected,
                lower_left: $scope.LLSelected,
                lower_right: $scope.LRSelected
            }
            var treatmentsResponse = treatmentService.putConsultedTreatment($scope.treatmentid, Treatment);
            treatmentsResponse.then(function (pl) {
                $scope.Update = false;
                loadConsultedTreatments();
                clearFields();
            }, function (err) {
                console.log("Err" + err);
            });
        }
    }

    $scope.updateTreatment = function (id, trtid, trtname, ur, ul, lr, ll) {
        $scope.treatmentid = id;
        $scope.Update = true;
        clearFields();
        //$scope.selectedTreatment = trtid;
        $scope.selectedTreatment = { id: trtid, name: trtname };
        if (ur !== null && ur !== "") {
            $scope.URSelected = ur;
            $scope.ura = ur.split(',');
            for (var i = 0; i < $scope.ura.length; i++) {
                index = parseInt($scope.ura[i]);
                $scope.teethUR[index - 1].checked = true;
            };
        }
        if (ul !== null && ul !== "") {
            $scope.ULSelected = ul;
            $scope.ula = ul.split(',');
            for (var i = 0; i < $scope.ula.length; i++) {
                index = parseInt($scope.ula[i]);
                $scope.teethUL[index - 1].checked = true;
            };
        }
        if (lr !== null && lr !== "") {
            $scope.LRSelected = lr;
            $scope.lra = lr.split(',');
            for (var i = 0; i < $scope.lra.length; i++) {
                index = parseInt($scope.lra[i]);
                $scope.teethLR[index - 1].checked = true;
            };
        }
        if (ll !== null && ll !== "") {
            $scope.LLSelected = ll;
            $scope.lla = ll.split(',');
            for (var i = 0; i < $scope.lla.length; i++) {
                index = parseInt($scope.lla[i]);
                $scope.teethLL[index - 1].checked = true;
            };
        }        
    }

    $scope.resetData = function () {
        $scope.Update = false;
        clearFields();
    }

    function loadPrescribedTreatments() {
        var prescribedTreatments = treatmentService.getPrescribedTreatments(id); //The MEthod Call from service
        prescribedTreatments.then(function (pl) {
            $scope.PrescribedTreatments = pl.data
        }, function (errorPl) {
            $log.error('Error loading treatments', errorPl);
        });
    }

    function loadConsultedTreatments() {
        var consultedTreatments = treatmentService.getConsultedTreatments(id); //The MEthod Call from service
        consultedTreatments.then(function (pl) {
            $scope.PrescribedTreatments = pl.data
        }, function (errorPl) {
            $log.error('Error loading treatments', errorPl);
        });
    }

    function clearFields() {
        angular.forEach($scope.teethUR, function (tooth) {
            tooth.checked = false;
        });
        angular.forEach($scope.teethUL, function (tooth) {
            tooth.checked = false;
        });
        angular.forEach($scope.teethLR, function (tooth) {
            tooth.checked = false;
        });
        angular.forEach($scope.teethLL, function (tooth) {
            tooth.checked = false;
        });
        $scope.URSelected = ""; $scope.ULSelected = ""; $scope.LRSelected = ""; $scope.LLSelected = "";
    }

    $scope.updatePrescription = function () {
        $location.path('/prescription/update/' + id);
    }

    $scope.updateConsultation = function () {
        $location.path('/consultation/' + id + '/prescription/' + pid);
    }

    $scope.done = function () {
        if (pid === undefined) {
            $location.path('/prescription/' + id);
        } else {
            $location.path('/prescription/' + pid);
        }
    }
})