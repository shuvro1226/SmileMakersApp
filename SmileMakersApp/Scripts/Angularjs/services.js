/// <reference path="../angular.js" />
/// <reference path="module.js" />


app.service("prescriptionService", function ($http) {    

    this.getPrescription = function (id) {
        return $http.get("api/PrescriptionsAPI/" + id);
    }


    // Add new prescription data
    this.post = function (Prescription) {
        var request = $http({
            method: "post",
            dataType: "json",
            url: "/api/PrescriptionsAPI",
            data: Prescription
        });
        return request;
    }

    // Update existing prescription data
    this.put = function (PresID, Prescription) {
        var request = $http({
            method: "put",
            dataType: "json",
            url: "/api/PrescriptionsAPI/" + PresID,
            data: Prescription
        });
        return request;
    }
});

app.service("consultationService", function ($http) {

    this.getConsultation = function (id) {
        return $http.get("api/ConsultationsAPI/" + id);
    }

    // Add new consultation data
    this.post = function (Consultation) {
        var request = $http({
            method: "post",
            dataType: "json",
            url: "/api/ConsultationsAPI",
            data: Consultation
        });
        return request;
    }

    // Update existing consultation data
    this.put = function (ConsID, Consultation) {
        var request = $http({
            method: "put",
            dataType: "json",
            url: "/api/ConsultationsAPI/" + ConsID,
            data: Consultation
        });
        return request;
    }
});


app.service("patientService", function ($http) {

    this.getPatients = function () {
        return $http.get("api/PatientsAPI/");
    }

    this.getPatient = function (id) {
        return $http.get("api/PatientsAPI/" + id);
    }

    this.getPatientByContact = function (id) {
        return $http.get("api/PatientsAPI/contact/" + id);
    }

    // Add new consultation data
    this.post = function (Patient) {
        var request = $http({
            method: "post",
            dataType: "json",
            url: "/api/PatientsAPI",
            data: Patient
        });
        return request;
    }

    // Add new consultation data
    this.put = function (id, Patient) {
        var request = $http({
            method: "put",
            dataType: "json",
            url: "/api/PatientsAPI/" + id,
            data: Patient
        });
        return request;
    }
});


app.service("treatmentService", function ($http) {
    this.getTreatments = function () {
        return $http.get("api/TreatmentsAPI/");
    }

    this.getPrescribedTreatments = function (id) {
        return $http.get("api/PrescribedTreatmentsAPI/" + id);
    }

    // Add new prescription data
    this.postPrescribedTreatment = function (PrescribedTreatment) {
        var request = $http({
            method: "post",
            dataType: "json",
            url: "/api/PrescribedTreatmentsAPI",
            data: PrescribedTreatment
        });
        return request;
    }

    // Update existing prescription data
    this.putPrescribedTreatment = function (id, PrescribedTreatment) {
        var request = $http({
            method: "put",
            dataType: "json",
            url: "/api/PrescribedTreatmentsAPI/" + id,
            data: PrescribedTreatment
        });
        return request;
    }

    this.getConsultedTreatments = function (id) {
        return $http.get("api/ConsultedTreatmentsAPI/" + id);
    }

    // Add new prescription data
    this.postConsultedTreatment = function (ConsultedTreatment) {
        var request = $http({
            method: "post",
            dataType: "json",
            url: "/api/ConsultedTreatmentsAPI",
            data: ConsultedTreatment
        });
        return request;
    }

    // Update existing prescription data
    this.putConsultedTreatment = function (id, ConsultedTreatment) {
        var request = $http({
            method: "put",
            dataType: "json",
            url: "/api/ConsultedTreatmentsAPI/" + id,
            data: ConsultedTreatment
        });
        return request;
    }
});

app.service('consultationChargeService', function ($http) {
    this.getCharge = function (id) {
        return $http.get('api/ConsultationChargeAPI/' + id);
    }

    // Add new consultationCharge data
    this.post = function (Charges) {
        var request = $http({
            method: "post",
            dataType: "json",
            url: "/api/ConsultationChargeAPI",
            data: Charges
        });
        return request;
    }

    // Update existing consultationCharge data
    this.put = function (ChargeID, Charges) {
        var request = $http({
            method: "put",
            dataType: "json",
            url: "/api/ConsultationChargeAPI/" + ChargeID,
            data: Charges
        });
        return request;
    }
});

app.service('appointmentService', function ($http) {
    // Get all prescriptions
    this.getPrescriptions = function (date) {
        return $http.get("api/AppointmentsAPI/date/" + date);
    }

    this.getAppointment = function (id) {
        return $http.get('api/AppointmentsAPI/' + id);
    }

    // Add new consultationCharge data
    this.post = function (Appointment) {
        var request = $http({
            method: "post",
            dataType: "json",
            url: "/api/AppointmentsAPI",
            data: Appointment
        });
        return request;
    }

    // Update existing consultationCharge data
    this.put = function (AppointmentID, Appointment) {
        var request = $http({
            method: "put",
            dataType: "json",
            url: "/api/AppointmentsAPI/" + AppointmentID,
            data: Appointment
        });
        return request;
    }
});