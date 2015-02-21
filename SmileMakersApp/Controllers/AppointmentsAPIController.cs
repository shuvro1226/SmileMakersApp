using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using SmileMakersApp.Models;

namespace SmileMakersApp.Controllers
{
    public class AppointmentsAPIController : ApiController
    {
        private SmileMakersAppDataEntities db = new SmileMakersAppDataEntities();

        // GET api/AppointmentsAPI
        public IQueryable<Appointment> GetAppointments()
        {
            return db.Appointments;
        }

        // GET api/AppointmentsAPI/5
        [Route("api/AppointmentsAPI/date/{date}")]
        [HttpGet]
        public IHttpActionResult GetAppointment(string date)
        {
            var appointments = from appointment in db.Appointments
                               where appointment.appointment_date == date
                               select new
                               {
                                   ID = appointment.Id,
                                   Time = appointment.appointment_time,
                                   AppointmentFixed = appointment.addition_date,
                                   FilterTime = appointment.datetime_filter,
                                   Name = appointment.Patient.name,
                                   Contact = appointment.Patient.contact,
                                   Task = appointment.next_task
                               };

            return Ok(appointments);
        }

        // GET api/AppointmentsAPI/5
        [ResponseType(typeof(Appointment))]
        public IHttpActionResult GetAppointment(int id)
        {
            var selectedAppointment = from appointment in db.Appointments
                                      where appointment.Id == id
                                      select new
                                      {
                                          Id = appointment.Id,
                                          patient_id = appointment.patient_id,
                                          name = appointment.Patient.name,
                                          addition_date = appointment.addition_date,
                                          appointment_date = appointment.appointment_date,
                                          appointment_time = appointment.appointment_time,
                                          next_task = appointment.next_task
                                      };

            return Ok(selectedAppointment);
        }

        // PUT api/AppointmentsAPI/5
        public IHttpActionResult PutAppointment(int id, Appointment appointment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != appointment.Id)
            {
                return BadRequest();
            }

            db.Entry(appointment).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppointmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/AppointmentsAPI
        [ResponseType(typeof(Appointment))]
        public IHttpActionResult PostAppointment(Appointment appointment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Appointments.Add(appointment);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = appointment.Id }, appointment);
        }

        // DELETE api/AppointmentsAPI/5
        [ResponseType(typeof(Appointment))]
        public IHttpActionResult DeleteAppointment(int id)
        {
            Appointment appointment = db.Appointments.Find(id);
            if (appointment == null)
            {
                return NotFound();
            }

            db.Appointments.Remove(appointment);
            db.SaveChanges();

            return Ok(appointment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AppointmentExists(int id)
        {
            return db.Appointments.Count(e => e.Id == id) > 0;
        }
    }
}