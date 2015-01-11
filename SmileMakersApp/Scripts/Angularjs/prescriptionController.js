/// <reference path="../angular.js" />
/// <reference path="module.js" />

app.controller("prescriptionController", function ($scope, $location, prescriptionService) {
    $scope.SurgeonCharge = 0;
    $scope.AssisstantCharge = 0;
    $scope.OTCharge = 0;
    $scope.SuctionTube = 0;
    $scope.Gloves = 0;
    $scope.SterilizationCost = 0;
    $scope.Needle = 0;
    $scope.RemarFile = 0;
    $scope.Bar = 0;
    $scope.PolishingBar = 0;
    $scope.PolishingPaste = 0;

    $scope.URSelected = "";
    $scope.teethUR = [{ id: 1, value: "UR1", checked: false }, { id: 2, value: "UR2", checked: false }, { id: 3, value: "UR3", checked: false }, { id: 4, value: "UR4", checked: false }, { id: 5, value: "UR5", checked: false }, { id: 6, value: "UR6", checked: false }, { id: 7, value: "UR7", checked: false }, { id: 8, value: "UR8", checked: false }];
    $scope.upperRight = function () {
        $scope.URSelected = "";
        for (var i = 0; i < $scope.teethUR.length; i++) {
            if ($scope.teethUR[i].checked == true) {
                if ($scope.URSelected == "") {
                    $scope.URSelected = $scope.teethUR[i].value;
                } else {
                    $scope.URSelected = $scope.URSelected + "," + $scope.teethUR[i].value;
                }
            }
        }
    }

    $scope.ULSelected = "";
    $scope.teethUL = [{ id: 1, value: "UL1", checked: false }, { id: 2, value: "UL2", checked: false }, { id: 3, value: "UL3", checked: false }, { id: 4, value: "UL4", checked: false }, { id: 5, value: "UL5", checked: false }, { id: 6, value: "UL6", checked: false }, { id: 7, value: "UL7", checked: false }, { id: 8, value: "UL8", checked: false }];
    $scope.upperLeft = function () {
        $scope.ULSelected = "";
        for (var i = 0; i < $scope.teethUL.length; i++) {
            if ($scope.teethUL[i].checked == true) {
                if ($scope.ULSelected == "") {
                    $scope.ULSelected = $scope.teethUL[i].value;
                } else {
                    $scope.ULSelected = $scope.ULSelected + "," + $scope.teethUL[i].value;
                }
            }
        }
    }

    $scope.LRSelected = "";
    $scope.teethLR = [{ id: 1, value: "LR1", checked: false }, { id: 2, value: "LR2", checked: false }, { id: 3, value: "LR3", checked: false }, { id: 4, value: "LR4", checked: false }, { id: 5, value: "LR5", checked: false }, { id: 6, value: "LR6", checked: false }, { id: 7, value: "LR7", checked: false }, { id: 8, value: "LR8", checked: false }];
    $scope.lowerRight = function () {
        $scope.LRSelected = "";
        for (var i = 0; i < $scope.teethLR.length; i++) {
            if ($scope.teethLR[i].checked == true) {
                if ($scope.LRSelected == "") {
                    $scope.LRSelected = $scope.teethLR[i].value;
                } else {
                    $scope.LRSelected = $scope.LRSelected + "," + $scope.teethLR[i].value;
                }
            }
        }
    }

    $scope.LLSelected = "";
    $scope.teethLL = [{ id: 1, value: "LL1", checked: false }, { id: 2, value: "LL2", checked: false }, { id: 3, value: "LL3", checked: false }, { id: 4, value: "LL4", checked: false }, { id: 5, value: "LL5", checked: false }, { id: 6, value: "LL6", checked: false }, { id: 7, value: "LL7", checked: false }, { id: 8, value: "LL8", checked: false }];
    $scope.lowerLeft = function () {
        $scope.LLSelected = "";
        for (var i = 0; i < $scope.teethLL.length; i++) {
            if ($scope.teethLL[i].checked == true) {
                if ($scope.LLSelected == "") {
                    $scope.LLSelected = $scope.teethLL[i].value;
                } else {
                    $scope.LLSelected = $scope.LLSelected + "," + $scope.teethLL[i].value;
                }
            }
        }
    }


    $scope.treatments = [
        { value: "RCT", checked: false }, { value: "Re-RCT", checked: false },
        { value: "Pulp Capping", checked: false }, { value: "Pulpotomy", checked: false }, 
        { value: "Pulpectomy", checked: false }, { value: "Light Cured Composite", checked: false }, 
        { value: "Light Cured Glass Ionomer", checked: false }, { value: "Glass Ionomer", checked: false }, 
        { value: "Onlay", checked: false }, { value: "Ceramage Crown", checked: false }, 
        { value: "Full Porcelain Crown", checked: false }, { value: "Full Metal Crown", checked: false }, 
        { value: "Post Crown", checked: false }, { value: "Full Porcelain Bridge", checked: false }, 
        { value: "Full Metal Bridge", checked: false }, { value: "Upper Full Denture", checked: false }, 
        { value: "Lower Full Denture", checked: false }, { value: "Partial Denture", checked: false },
        { value: "Removable Appliance", checked: false }, { value: "Functional Appliance", checked: false },
        { value: "Extraction", checked: false }, { value: "Surgical Extraction", checked: false }, 
        { value: "Operculectomy", checked: false }, { value: "Scaling", checked: false }, 
        { value: "Deep Curettege", checked: false }, { value: "Polishing", checked: false }
    ];

    //$scope.treatmentSelected = function () {
    //    $scope.Treatment = "";
    //    for (var i = 0; i < $scope.treatments.length; i++) {
    //        for (var j = 0 ; j < $scope.treatments[i].properties.length; j++) {
    //            if ($scope.treatments[i].properties[j].checked == true) {
    //                if ($scope.Treatment == "") {
    //                    $scope.Treatment = $scope.treatments[i].name + ": " + $scope.treatments[i].properties[j].value;
    //                } else {
    //                    $scope.Treatment = $scope.Treatment + " / " + $scope.treatments[i].name + ": " + $scope.treatments[i].properties[j].value;
    //                }
    //            }
    //        }
    //    }
    //};

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
    $scope.date = day + "/" + month + "/" + year;

    $scope.Treatment = "";
    $scope.addTreatmentDetails = function () {
        if ($scope.selectedTreatment !== "" && ($scope.URSelected !== "" || $scope.ULSelected !== "" || $scope.LLSelected !== "" || $scope.LRSelected !== "")) {
            $scope.teethSelected = "";
            if ($scope.URSelected !== "") {
                $scope.teethSelected = $scope.URSelected;
            }
            if ($scope.ULSelected !== "" && $scope.teethSelected !== "") {
                $scope.teethSelected = $scope.teethSelected + "," + $scope.ULSelected;
            }
            if ($scope.ULSelected !== "" && $scope.teethSelected === "") {
                $scope.teethSelected = $scope.ULSelected;
            }
            if ($scope.LRSelected !== "" && $scope.teethSelected !== "") {
                $scope.teethSelected = $scope.teethSelected + "," + $scope.LRSelected;
            }
            if ($scope.LRSelected !== "" && $scope.teethSelected === "") {
                $scope.teethSelected = $scope.LRSelected;
            }
            if ($scope.LLSelected !== "" && $scope.teethSelected !== "") {
                $scope.teethSelected = $scope.teethSelected + "," + $scope.LLSelected;
            }
            if ($scope.LLSelected !== "" && $scope.teethSelected === "") {
                $scope.teethSelected = $scope.LLSelected;
            }
            if ($scope.Treatment === "") {
                $scope.Treatment = $scope.selectedTreatment + "(" + $scope.teethSelected + ")";
            } else {
                $scope.Treatment = $scope.Treatment + ", " + $scope.selectedTreatment + "(" + $scope.teethSelected + ")";
            }

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
        } else {
            alert("All fields must be filled to add treatment");
        }
    };


    $scope.save = function () {
        
        alert($scope.NextTask);
        var Prescription = {
            patient_name: $scope.PatientName,
            patient_age: $scope.PatientAge,
            patient_contact: $scope.PatientContact,
            prescription_date: $scope.date,
            oral_examination: $scope.OralExam,
            medical_history: $scope.MedHistory,
            investigation: $scope.Investigation,
            advice: $scope.Advice,
            treatment: $scope.Treatment,
            appointment: $scope.Appointment,
            next_task: $scope.NextTask,
            surgeon_charge: $scope.SurgeonCharge,
            assisstant_charge: $scope.AssisstantCharge,
            ot_charge: $scope.OTCharge,
            suction_tube: $scope.SuctionTube,
            gloves: $scope.Gloves,
            sterilization_cost: $scope.SterilizationCost,
            needle: $scope.Needle,
            remar_file: $scope.RemarFile,
            bar: $scope.Bar,
            polishing_bar: $scope.PolishingBar,
            polishing_paste: $scope.PolishingPaste
        };
        prescriptionService.post(Prescription);

        var docDefinition = {
            content: [ 'Patient\'s name: ' + $scope.PatientName ]
        };
        pdfMake.createPdf(docDefinition).open();

        $location.path('/');
    };
})