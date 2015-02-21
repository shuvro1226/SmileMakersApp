using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SmileMakersApp.Controllers
{
    public class PatientsController : Controller
    {
        //
        // GET: /Patients/
        public ActionResult Index()
        {
            return PartialView("Index");
        }

        //
        // GET: /Patients/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /Patients/Create
        public ActionResult Create()
        {
            return PartialView("Create");
        }

        //
        // POST: /Patients/Create
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
        // GET: /Patients/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /Patients/Edit/5
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
        // GET: /Patients/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /Patients/Delete/5
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
