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
    public class PrescriptionsAPIController : ApiController
    {
        private SmileMakersAppDataEntities db = new SmileMakersAppDataEntities();

        // GET api/PrescriptionsAPI
        public IQueryable<Prescription> GetPrescriptions()
        {
            return db.Prescriptions;
        }

        //// GET api/PrescriptionAPI
        //[Route("api/PrescriptionsAPI/date/{date}")]
        //[HttpGet]
        //public IHttpActionResult GetPrescription(string date)
        //{
        //    string today = DateTime.Now.ToString("dd/MM/yyyy");
        //    var appointment1 = from prescription in db.Prescriptions
        //                       where prescription.appointment_date == date
        //                       select new
        //                       {
        //                           Time = prescription.appointment_time,
        //                           FilterTime = prescription.datetime_filter,
        //                           Name = prescription.Patient.name,
        //                           Contact = prescription.Patient.contact,
        //                           Task = prescription.next_task
        //                       };

        //    var appointment2 = from consultation in db.Consultations
        //                       where consultation.next_date == date
        //                       select new
        //                       {
        //                           Time = consultation.next_time,
        //                           FilterTime = consultation.datetime_filter,
        //                           Name = consultation.Prescription.Patient.name,
        //                           Contact = consultation.Prescription.Patient.contact,
        //                           Task = consultation.next_task
        //                       };

        //    var finalAppointments = appointment1.Concat(appointment2);

        //    return Ok(finalAppointments);
        //}

        // GET api/PrescriptionsAPI/5
        [ResponseType(typeof(Prescription))]
        public IHttpActionResult GetPrescription(int id)
        {
            var getPrescription = from prescription in db.Prescriptions
                                  where prescription.id == id
                                  select new
                                  {
                                      id = prescription.id,
                                      prescription_date = prescription.prescription_date,
                                      oral_examination = prescription.oral_examination,
                                      medical_history = prescription.medical_history,
                                      investigation = prescription.investigation,
                                      advice = prescription.advice,
                                      Patient = from ptnt in db.Patients
                                                where ptnt.id == prescription.patient_id
                                                select new 
                                                {
                                                    ptnt.id,
                                                    ptnt.name,
                                                    ptnt.contact,
                                                    ptnt.address,
                                                    ptnt.age
                                                },
                                      ConsultationCharges = from cc in db.ConsultationCharges
                                                            where cc.prescription_id == id
                                                            select new
                                                            {
                                                                cc.id,
                                                                cc.surgeon_charge,
                                                                cc.assisstant_charge,
                                                                cc.ot_charge,
                                                                cc.suction_tube,
                                                                cc.gloves,
                                                                cc.sterilization_cost,
                                                                cc.needle,
                                                                cc.remar_file,
                                                                cc.polishing_bar,
                                                                cc.polishing_paste,
                                                                cc.bar
                                                            },
                                      PrescribedTreatments = from pt in db.PrescribedTreatments
                                                             where pt.prescription_id == id
                                                             select new
                                                             {
                                                                 pt.id,
                                                                 pt.Treatment.name,
                                                                 pt.upper_left,
                                                                 pt.upper_right,
                                                                 pt.lower_left,
                                                                 pt.lower_right
                                                             },
                                      Consultations = from ct in db.Consultations
                                                      where ct.prescription_id == id
                                                      select new
                                                      {
                                                          ct.id,
                                                          ct.consultation_date,
                                                          ConsultedTreatments = from cttrt in db.ConsultedTreatments
                                                                                where cttrt.consultation_id == ct.id
                                                                                select new 
                                                                                {
                                                                                    cttrt.id,
                                                                                    cttrt.Treatment.name,
                                                                                    cttrt.upper_left,
                                                                                    cttrt.upper_right,
                                                                                    cttrt.lower_left,
                                                                                    cttrt.lower_right
                                                                                }
                                                      }
                                  };

            return Ok(getPrescription);
        }

        // PUT api/PrescriptionsAPI/5
        public IHttpActionResult PutPrescription(int id, Prescription prescription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != prescription.id)
            {
                return BadRequest();
            }

            db.Entry(prescription).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrescriptionExists(id))
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

        // POST api/PrescriptionsAPI
        [ResponseType(typeof(Prescription))]
        public IHttpActionResult PostPrescription(Prescription prescription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Prescriptions.Add(prescription);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = prescription.id }, prescription);
        }

        // DELETE api/PrescriptionsAPI/5
        [ResponseType(typeof(Prescription))]
        public IHttpActionResult DeletePrescription(int id)
        {
            Prescription prescription = db.Prescriptions.Find(id);
            if (prescription == null)
            {
                return NotFound();
            }

            db.Prescriptions.Remove(prescription);
            db.SaveChanges();

            return Ok(prescription);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PrescriptionExists(int id)
        {
            return db.Prescriptions.Count(e => e.id == id) > 0;
        }
    }
}