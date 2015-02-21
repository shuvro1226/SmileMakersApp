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
    public class ConsultationsAPIController : ApiController
    {
        private SmileMakersAppDataEntities db = new SmileMakersAppDataEntities();

        // GET api/ConsultationsAPI
        public IQueryable<Consultation> GetConsultations()
        {
            return db.Consultations;
        }

        // GET api/ConsultationsAPI/5
        [ResponseType(typeof(Consultation))]
        public IHttpActionResult GetConsultation(int id)
        {
            var consultationDetails = from consultation in db.Consultations
                                      where consultation.id == id
                                      select new 
                                      {
                                          consultation.id,
                                          consultation.consultation_date,
                                          consultation.payment_recieved
                                      };

            return Ok(consultationDetails);
        }

        // PUT api/ConsultationsAPI/5
        public IHttpActionResult PutConsultation(int id, Consultation consultation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != consultation.id)
            {
                return BadRequest();
            }

            db.Entry(consultation).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConsultationExists(id))
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

        // POST api/ConsultationsAPI
        [ResponseType(typeof(Consultation))]
        public IHttpActionResult PostConsultation(Consultation consultation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Consultations.Add(consultation);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = consultation.id }, consultation);
        }

        // DELETE api/ConsultationsAPI/5
        [ResponseType(typeof(Consultation))]
        public IHttpActionResult DeleteConsultation(int id)
        {
            Consultation consultation = db.Consultations.Find(id);
            if (consultation == null)
            {
                return NotFound();
            }

            db.Consultations.Remove(consultation);
            db.SaveChanges();

            return Ok(consultation);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ConsultationExists(int id)
        {
            return db.Consultations.Count(e => e.id == id) > 0;
        }
    }
}