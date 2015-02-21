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
    public class PrescribedTreatmentsAPIController : ApiController
    {
        private SmileMakersAppDataEntities db = new SmileMakersAppDataEntities();

        // GET api/PrescribedTreatmentsAPI
        public IQueryable<PrescribedTreatment> GetPrescribedTreatments()
        {
            return db.PrescribedTreatments;
        }

        // GET api/PrescribedTreatmentsAPI/5
        [ResponseType(typeof(PrescribedTreatment))]
        public IHttpActionResult GetPrescribedTreatment(int id)
        {
            var prescribedTreatments = from treatments in db.PrescribedTreatments
                                       where treatments.prescription_id == id
                                       select new
                                       {
                                           ID = treatments.id,
                                           TreatmentID = treatments.treatment_id,
                                           TreatmentType = treatments.Treatment.name,
                                           UpperLeft = treatments.upper_left,
                                           UpperRight = treatments.upper_right,
                                           LowerLeft = treatments.lower_left,
                                           LowerRight = treatments.lower_right
                                       };

            return Ok(prescribedTreatments);
        }

        // PUT api/PrescribedTreatmentsAPI/5
        public IHttpActionResult PutPrescribedTreatment(int id, PrescribedTreatment prescribedtreatment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != prescribedtreatment.id)
            {
                return BadRequest();
            }

            db.Entry(prescribedtreatment).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrescribedTreatmentExists(id))
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

        // POST api/PrescribedTreatmentsAPI
        [ResponseType(typeof(PrescribedTreatment))]
        public IHttpActionResult PostPrescribedTreatment(PrescribedTreatment prescribedtreatment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.PrescribedTreatments.Add(prescribedtreatment);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = prescribedtreatment.id }, prescribedtreatment);
        }

        // DELETE api/PrescribedTreatmentsAPI/5
        [ResponseType(typeof(PrescribedTreatment))]
        public IHttpActionResult DeletePrescribedTreatment(int id)
        {
            PrescribedTreatment prescribedtreatment = db.PrescribedTreatments.Find(id);
            if (prescribedtreatment == null)
            {
                return NotFound();
            }

            db.PrescribedTreatments.Remove(prescribedtreatment);
            db.SaveChanges();

            return Ok(prescribedtreatment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PrescribedTreatmentExists(int id)
        {
            return db.PrescribedTreatments.Count(e => e.id == id) > 0;
        }
    }
}