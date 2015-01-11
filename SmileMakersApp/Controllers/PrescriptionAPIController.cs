﻿using System;
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
    public class PrescriptionAPIController : ApiController
    {
        private SmileMakersAppDataEntities db = new SmileMakersAppDataEntities();

        // GET api/PrescriptionAPI
        public IQueryable<Prescription> GetPrescriptions()
        {
            //string today = DateTime.Now.ToString("dd/MM/yyyy");
            //var appointment1 = from prescription in db.Prescriptions
            //                   where prescription.appointment == today
            //                   select new
            //                   {
            //                       ID = prescription.id,
            //                       Name = prescription.patient_name,
            //                       Contact = prescription.patient_contact,
            //                       Task = prescription.next_task
            //                   };

            //var appointment2 = from consultation in db.Consultations
            //                   where consultation.next_date == today
            //                   select new
            //                   {
            //                       ID = consultation.Prescription.id,
            //                       Name = consultation.Prescription.patient_name,
            //                       Contact = consultation.Prescription.patient_contact,
            //                       Task = consultation.next_task
            //                   };

            //var finalAppointments = appointment1.Concat(appointment2);

            //return finalAppointments;
            return db.Prescriptions;
        }

        // GET api/PrescriptionAPI/5
        [ResponseType(typeof(Prescription))]
        public IHttpActionResult GetPrescription(int id)
        {
            Prescription prescription = db.Prescriptions.Find(id);
            if (prescription == null)
            {
                return NotFound();
            }

            return Ok(prescription);
        }

        // PUT api/PrescriptionAPI/5
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

        // POST api/PrescriptionAPI
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

        // DELETE api/PrescriptionAPI/5
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