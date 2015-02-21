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

    $scope.printPrescription = function () {

        var PdfPrinter = require('src/printer');
        var printer = new PdfPrinter(fonts);
        var fs = require('fs');

        var dd = {
            content: [
                {
                    image: 'picture13438908025659.jpg'
                },
                {
                    text: 'Patient\'s Detail', fontSize: 18, bold: true
                },
                {
                    columns: [
                        {
                            text: 'Patient\'s ID: ' + $scope.prescription.Patient[0].id, bold: false
                        },
                        {
                            text: 'Name: ' + $scope.prescription.Patient[0].name, bold: false
                        },
                        {
                            text: 'Age: ' + $scope.prescription.Patient[0].age, bold: false
                        },
                        {
                            text: 'Contact: ' + $scope.prescription.Patient[0].contact, bold: false
                        }
                    ]
                    
                },
                {
                    text: 'Address: ' + $scope.prescription.Patient[0].address, bold: false
                }
            ]
        }
        var pdfDoc = printer.createPdfKitDocument(dd);
        pdfDoc.pipe(fs.createWriteStream('images.pdf'));
        pdfDoc.end();
        pdfMake.createPdf(dd).open();
    }

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
        $location.path('/patient/' + id);
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