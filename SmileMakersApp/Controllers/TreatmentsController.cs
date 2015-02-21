using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SmileMakersApp.Controllers
{
    public class TreatmentsController : Controller
    {
        //
        // GET: /Treatments/
        public ActionResult Index()
        {
            return View();
        }

        //
        // GET: /Treatments/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /Treatments/Create
        public ActionResult Create()
        {
            return PartialView("Create");
        }

        //
        // POST: /Treatments/Create
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
        // GET: /Treatments/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /Treatments/Edit/5
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
        // GET: /Treatments/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /Treatments/Delete/5
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
