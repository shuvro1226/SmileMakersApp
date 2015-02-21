using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SmileMakersApp.Controllers
{
    public class AppointmentsController : Controller
    {
        //
        // GET: /Appointments/
        public ActionResult Index()
        {
            return View();
        }

        //
        // GET: /Appointments/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /Appointments/Create
        public ActionResult Create()
        {
            return PartialView("Create");
        }

        //
        // POST: /Appointments/Create
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
        // GET: /Appointments/Edit
        public ActionResult Edit()
        {
            return PartialView("Edit");
        }

        //
        // POST: /Appointments/Edit/5
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
        // GET: /Appointments/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /Appointments/Delete/5
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
