/// <reference path="../angular.js" />
/// <reference path="module.js" />

app.controller("appointmentController", function ($scope, $routeParams, $location, patientService, appointmentService) {
    var id = $routeParams.id;

    if (id === '0') {
        $scope.Update = false;
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
        $scope.date = day + "-" + month + "-" + year;

        return patientService.getPatients().then(function (pl) {
            $scope.patients = pl.data;
        },
        function (errorPl) {
            //$scope.AppointmentFound = false;
        });
    } else {
        $scope.Update = true;
        var getAppointment = appointmentService.getAppointment(id);
        getAppointment.then(function (pl) {
            $scope.appointment = pl.data[0];
            $scope.Patient = $scope.appointment.name;
            $scope.PatientID = $scope.appointment.patient_id,
            $scope.date = $scope.appointment.addition_date;
            //var appointment_date = $scope.appointment.appointment_date;
            //var pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
            //$scope.AppointmentDate = new Date(appointment_date.replace(pattern, '$3-$2-$1'));
            $scope.AppointmentDate = $scope.appointment.appointment_date;
            console.log(typeof $scope.AppointmentDate);
            $scope.AppointmentTime = $scope.appointment.appointment_time;
            $scope.NextTask = $scope.appointment.next_task;
        }, function (errorPl) {
            $log.error('Error loading appointment data', errorPl);
        });
    }    

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };
    $scope.dateOptions = {
        formatDate: 'dd-MM-yyyy'
    };
    $scope.format = 'dd-MM-yyyy';

    $scope.save = function () {
        
        if (($scope.AppointmentDate.getMonth() + 1) < 10 && $scope.AppointmentDate.getDate() < 10) {
            var saveDate = "0" + $scope.AppointmentDate.getDate() + "-0" + ($scope.AppointmentDate.getMonth() + 1) + "-" + $scope.AppointmentDate.getFullYear();
        } else if (($scope.AppointmentDate.getMonth() + 1) < 10 && $scope.AppointmentDate.getDate() >= 10) {
            var saveDate = $scope.AppointmentDate.getDate() + "-0" + ($scope.AppointmentDate.getMonth() + 1) + "-" + $scope.AppointmentDate.getFullYear();
        } else if (($scope.AppointmentDate.getMonth() + 1) >= 10 && $scope.AppointmentDate.getDate() < 10) {
            var saveDate = "0" + $scope.AppointmentDate.getDate() + "-" + ($scope.AppointmentDate.getMonth() + 1) + "-" + $scope.AppointmentDate.getFullYear();
        } else {
            var saveDate = $scope.AppointmentDate.getDate() + "-" + ($scope.AppointmentDate.getMonth() + 1) + "-" + $scope.AppointmentDate.getFullYear();
        }        

        var dateTimeFilter = saveDate + " " + $scope.AppointmentTime;
        var reggie = /(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})/;
        var dateArray = reggie.exec(dateTimeFilter);
        var dateFilter = (+dateArray[3]) + "/0" + (+dateArray[2]) + "/" + (+dateArray[1]) + " " + (+dateArray[4]) + ":" + (+dateArray[5]);
        $scope.dateObject = Date.parse(dateFilter);
        var Appointment = {
            patient_id: $scope.PatientID.id,
            addition_date: $scope.date,
            appointment_date: saveDate,
            appointment_time: $scope.AppointmentTime,
            datetime_filter: $scope.dateObject,
            next_task: $scope.NextTask
        };

        var appointmentResponse = appointmentService.post(Appointment);
        appointmentResponse.then(function (pl) {
            $scope.appointmentid = pl.data.id;
            $location.path('/');
        }, function (err) {
            console.log("Err" + err);
        });
    };

    $scope.update = function () {
        if (typeof ($scope.AppointmentDate) === "string" || $scope.AppointmentDate instanceof String) {
            var updateDate = $scope.AppointmentDate;
        } else {
            if (($scope.AppointmentDate.getMonth() + 1) < 10 && $scope.AppointmentDate.getDate() < 10) {
                var updateDate = "0" + $scope.AppointmentDate.getDate() + "-0" + ($scope.AppointmentDate.getMonth() + 1) + "-" + $scope.AppointmentDate.getFullYear();
            } else if (($scope.AppointmentDate.getMonth() + 1) < 10 && $scope.AppointmentDate.getDate() >= 10) {
                var updateDate = $scope.AppointmentDate.getDate() + "-0" + ($scope.AppointmentDate.getMonth() + 1) + "-" + $scope.AppointmentDate.getFullYear();
            } else if (($scope.AppointmentDate.getMonth() + 1) >= 10 && $scope.AppointmentDate.getDate() < 10) {
                var updateDate = "0" + $scope.AppointmentDate.getDate() + "-" + ($scope.AppointmentDate.getMonth() + 1) + "-" + $scope.AppointmentDate.getFullYear();
            } else {
                var updateDate = $scope.AppointmentDate.getDate() + "-" + ($scope.AppointmentDate.getMonth() + 1) + "-" + $scope.AppointmentDate.getFullYear();
            }
        }

        var dateTimeFilter = updateDate + " " + $scope.AppointmentTime;
        var reggie = /(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})/;
        var dateArray = reggie.exec(dateTimeFilter);
        var dateFilter = (+dateArray[3]) + "/0" + (+dateArray[2]) + "/" + (+dateArray[1]) + " " + (+dateArray[4]) + ":" + (+dateArray[5]);
        $scope.dateObject = Date.parse(dateFilter);
        var Appointment = {
            id: id,
            patient_id: $scope.PatientID,
            addition_date: $scope.date,
            appointment_date: updateDate,
            appointment_time: $scope.AppointmentTime,
            datetime_filter: $scope.dateObject,
            next_task: $scope.NextTask
        };

        var appointmentResponse = appointmentService.put(id, Appointment);
        appointmentResponse.then(function (pl) {
            $location.path('/');
        }, function (err) {
            console.log("Err" + err);
        });
    }    
})