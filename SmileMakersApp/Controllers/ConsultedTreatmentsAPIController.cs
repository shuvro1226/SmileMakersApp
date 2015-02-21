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
    public class ConsultedTreatmentsAPIController : ApiController
    {
        private SmileMakersAppDataEntities db = new SmileMakersAppDataEntities();

        // GET api/ConsultedTreatmentsAPI
        public IQueryable<ConsultedTreatment> GetConsultedTreatments()
        {
            return db.ConsultedTreatments;
        }

        // GET api/ConsultedTreatmentsAPI/5
        [ResponseType(typeof(ConsultedTreatment))]
        public IHttpActionResult GetConsultedTreatment(int id)
        {
            var consultedTreatments = from treatments in db.ConsultedTreatments
                                       where treatments.consultation_id == id
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

            return Ok(consultedTreatments);
        }

        // PUT api/ConsultedTreatmentsAPI/5
        public IHttpActionResult PutConsultedTreatment(int id, ConsultedTreatment consultedtreatment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != consultedtreatment.id)
            {
                return BadRequest();
            }

            db.Entry(consultedtreatment).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConsultedTreatmentExists(id))
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

        // POST api/ConsultedTreatmentsAPI
        [ResponseType(typeof(ConsultedTreatment))]
        public IHttpActionResult PostConsultedTreatment(ConsultedTreatment consultedtreatment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ConsultedTreatments.Add(consultedtreatment);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = consultedtreatment.id }, consultedtreatment);
        }

        // DELETE api/ConsultedTreatmentsAPI/5
        [ResponseType(typeof(ConsultedTreatment))]
        public IHttpActionResult DeleteConsultedTreatment(int id)
        {
            ConsultedTreatment consultedtreatment = db.ConsultedTreatments.Find(id);
            if (consultedtreatment == null)
            {
                return NotFound();
            }

            db.ConsultedTreatments.Remove(consultedtreatment);
            db.SaveChanges();

            return Ok(consultedtreatment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ConsultedTreatmentExists(int id)
        {
            return db.ConsultedTreatments.Count(e => e.id == id) > 0;
        }
    }
}