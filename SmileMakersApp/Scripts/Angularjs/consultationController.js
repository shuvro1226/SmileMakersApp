/// <reference path="../angular.js" />
/// <reference path="module.js" />

app.controller("consultationController", function ($scope, consultationService) {

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
    $scope.ConsultDate = day + "/" + month + "/" + year;
    
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

    $scope.save = function () {
        //var date = $('.datepicker').datepicker({ dateFormat: 'dd-mm-yy' }).val();
        var Consultation = {
            prescription_id: $scope.PresID,
            consultation_date: $scope.ConsultDate,
            next_consulltation_date: $scope.NextConsultDate,
            next_consultation_task: $scope.NextConsultWork,
            payment_recieved: $scope.AmountPaid,
            payment_left: $scope.AmountRemain,
            work_done: $scope.WorkDone,
            upper_left: $scope.ULSelected,
            upper_right: $scope.URSelected,
            lower_left: $scope.LLSelected,
            lower_right: $scope.LRSelected
        };
        
        consultationService.post(Consultation);
    };
})