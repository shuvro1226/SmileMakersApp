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
    public class PatientsAPIController : ApiController
    {
        private SmileMakersAppDataEntities db = new SmileMakersAppDataEntities();

        // GET api/PatientsAPI
        [ResponseType(typeof(Patient))]
        public IHttpActionResult GetPatients()
        {
            var patients = from patient in db.Patients
                           select new
                           {
                               id = patient.id,
                               name = patient.name,
                               contact = patient.contact
                           };
            return Ok(patients);
        }

        // GET api/PatientsAPI/5
        [ResponseType(typeof(Patient))]
        public IHttpActionResult GetPatient(int id)
        {
            var selectedPatient = from patient in db.Patients
                                  where patient.id == id
                                  select new
                                  {
                                      id = patient.id,
                                      name = patient.name,
                                      age = patient.age,
                                      contact = patient.contact,
                                      address = patient.address,
                                      Prescriptions = from prescription in db.Prescriptions
                                                      where prescription.patient_id == id
                                                      select new
                                                      {
                                                          prescription_date = prescription.prescription_date
                                                      }
                                  };

            return Ok(selectedPatient);
        }

        [Route("api/PatientsAPI/contact/{contact}")]
        [HttpGet]
        public IHttpActionResult GetPatient(string contact)
        {
            var selectedPatient = from patient in db.Patients
                                  where patient.contact == contact || patient.name.Contains(contact)
                                  select new
                                  {
                                      id = patient.id,
                                      name = patient.name,
                                      age = patient.age,
                                      contact = patient.contact,
                                      address = patient.address
                                  };

            return Ok(selectedPatient);
        }

        // PUT api/PatientsAPI/5
        public IHttpActionResult PutPatient(int id, Patient patient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != patient.id)
            {
                return BadRequest();
            }

            db.Entry(patient).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PatientExists(id))
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

        // POST api/PatientsAPI
        [ResponseType(typeof(Patient))]
        public IHttpActionResult PostPatient(Patient patient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Patients.Add(patient);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = patient.id }, patient);
        }

        // DELETE api/PatientsAPI/5
        [ResponseType(typeof(Patient))]
        public IHttpActionResult DeletePatient(int id)
        {
            Patient patient = db.Patients.Find(id);
            if (patient == null)
            {
                return NotFound();
            }

            db.Patients.Remove(patient);
            db.SaveChanges();

            return Ok(patient);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PatientExists(int id)
        {
            return db.Patients.Count(e => e.id == id) > 0;
        }
    }
}