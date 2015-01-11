using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SmileMakersApp.Controllers
{
    public class ConsultationController : Controller
    {
        //
        // GET: /Consultation/
        public ActionResult Index()
        {
            return View();
        }

        //
        // GET: /Consultation/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /Consultation/Create
        public ActionResult Create()
        {
            return PartialView("Create");
        }

        //
        // POST: /Consultation/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Consultation/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /Consultation/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Consultation/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /Consultation/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
