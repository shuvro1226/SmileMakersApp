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
    public class ConsultationChargeAPIController : ApiController
    {
        private SmileMakersAppDataEntities db = new SmileMakersAppDataEntities();

        // GET api/ConsultationChargeAPI
        public IQueryable<ConsultationCharge> GetConsultationCharges()
        {
            return db.ConsultationCharges;
        }

        // GET api/ConsultationChargeAPI/5
        [ResponseType(typeof(ConsultationCharge))]
        public IHttpActionResult GetConsultationCharge(int id)
        {
            var consultationCharges = from charges in db.ConsultationCharges
                                      where charges.prescription_id == id
                                      select new
                                      {
                                          ID = charges.id,
                                          Surgeon = charges.surgeon_charge,
                                          Assistant = charges.assisstant_charge,
                                          OT = charges.ot_charge,
                                          SuctionTube = charges.suction_tube,
                                          Gloves = charges.gloves,
                                          Sterilization = charges.sterilization_cost,
                                          Needle = charges.needle,
                                          RemarFile = charges.remar_file,
                                          Bar = charges.bar,
                                          PolishingBar = charges.polishing_bar,
                                          PolishingPaste = charges.polishing_paste
                                      };

            return Ok(consultationCharges);
        }

        // PUT api/ConsultationChargeAPI/5
        public IHttpActionResult PutConsultationCharge(int id, ConsultationCharge consultationcharge)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != consultationcharge.id)
            {
                return BadRequest();
            }

            db.Entry(consultationcharge).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConsultationChargeExists(id))
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

        // POST api/ConsultationChargeAPI
        [ResponseType(typeof(ConsultationCharge))]
        public IHttpActionResult PostConsultationCharge(ConsultationCharge consultationcharge)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ConsultationCharges.Add(consultationcharge);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = consultationcharge.id }, consultationcharge);
        }

        // DELETE api/ConsultationChargeAPI/5
        [ResponseType(typeof(ConsultationCharge))]
        public IHttpActionResult DeleteConsultationCharge(int id)
        {
            ConsultationCharge consultationcharge = db.ConsultationCharges.Find(id);
            if (consultationcharge == null)
            {
                return NotFound();
            }

            db.ConsultationCharges.Remove(consultationcharge);
            db.SaveChanges();

            return Ok(consultationcharge);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ConsultationChargeExists(int id)
        {
            return db.ConsultationCharges.Count(e => e.id == id) > 0;
        }
    }
}