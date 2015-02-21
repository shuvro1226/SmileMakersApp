/// <reference path="../angular.js" />
/// <reference path="module.js" />

app.controller("addChargesController", function ($scope, $routeParams, $location, consultationChargeService) {
    var presID = $routeParams.presid;
    var id;
    
    $scope.SurgeonCharge = 0;
    $scope.AssistantCharge = 0;
    $scope.OTCharge = 0;
    $scope.SuctionTube = 0;
    $scope.Gloves = 0;
    $scope.SterilizationCost = 0;
    $scope.Needle = 0;
    $scope.RemarFile = 0;
    $scope.Bar = 0;
    $scope.PolishingBar = 0;
    $scope.PolishingPaste = 0;

    var getCharges = consultationChargeService.getCharge(presID);
    getCharges.then(function (pl) {
        $scope.charges = pl.data[0];
        id = $scope.charges.ID;
        if (id === null) {
            $scope.Update = false;            
        } else {
            $scope.Update = true;
            $scope.SurgeonCharge = $scope.charges.Surgeon,
            $scope.AssistantCharge = $scope.charges.Assistant,
            $scope.OTCharge = $scope.charges.OT,
            $scope.SuctionTube = $scope.charges.SuctionTube,
            $scope.Gloves = $scope.charges.Gloves,
            $scope.SterilizationCost = $scope.charges.Sterilization,
            $scope.Needle = $scope.charges.Needle,
            $scope.RemarFile = $scope.charges.RemarFile,
            $scope.Bar = $scope.charges.Bar,
            $scope.PolishingBar = $scope.charges.PolishingBar,
            $scope.PolishingPaste = $scope.charges.PolishingPaste
        }
    }, function (errorPl) {
        $log.error('Error loading prescription data', errorPl);
    });

    $scope.save = function () {
        var charges = {
            prescription_id: presID,
            surgeon_charge: $scope.SurgeonCharge,
            assisstant_charge: $scope.AssistantCharge,
            ot_charge: $scope.OTCharge,
            suction_tube: $scope.SuctionTube,
            gloves: $scope.Gloves,
            sterilization_cost: $scope.SterilizationCost,
            needle: $scope.Needle,
            remar_file: $scope.RemarFile,
            bar: $scope.Bar,
            polishing_bar: $scope.PolishingBar,
            polishing_paste: $scope.PolishingPaste
        }
        consultationChargeService.post(charges);
        $location.path('/prescription/' + presID);
    }

    $scope.update = function () {
        var charges = {
            id: id,
            prescription_id: presID,
            surgeon_charge: $scope.SurgeonCharge,
            assisstant_charge: $scope.AssistantCharge,
            ot_charge: $scope.OTCharge,
            suction_tube: $scope.SuctionTube,
            gloves: $scope.Gloves,
            sterilization_cost: $scope.SterilizationCost,
            needle: $scope.Needle,
            remar_file: $scope.RemarFile,
            bar: $scope.Bar,
            polishing_bar: $scope.PolishingBar,
            polishing_paste: $scope.PolishingPaste
        }
        consultationChargeService.put(id, charges);
        $location.path('/prescription/' + presID);
    }
})