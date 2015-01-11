/// <reference path="../angular.js" />
/// <reference path="module.js" />


app.service("prescriptionService", function ($http) {
    // Get all prescriptions
    this.getPrescriptions = function (date) {
        return $http.get("api/PrescriptionAPI/" + date);
    }


    // Add new prescription data
    this.post = function (Prescription) {
        var request = $http({
            method: "post",
            dataType: "json",
            url: "/api/PrescriptionAPI",
            data: Prescription
        });
        return request;
    }
});

app.service("consultationService", function ($http) {

    // Add new consultation data
    this.post = function (Consultation) {
        var request = $http({
            method: "post",
            dataType: "json",
            url: "/api/ConsultationAPI",
            data: Consultation
        });
        return request;
    }
});

app.service("showAppointmentsService", function ($http) {

    // Add new consultation data
    this.post = function (Consultation) {
        var request = $http({
            method: "post",
            dataType: "json",
            url: "/api/ConsultationAPI",
            data: Consultation
        });
        return request;
    }
});