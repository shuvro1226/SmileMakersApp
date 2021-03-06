﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SmileMakersApp.Controllers
{
    public class PrescriptionController : Controller
    {
        //
        // GET: /Prescription/
        public ActionResult Index()
        {
            return View();
        }

        //
        // GET: /Prescription/Details
        public ActionResult Details()
        {
            return PartialView("Show");
        }

        //
        // GET: /Prescription/Create
        public ActionResult Create()
        {
            return PartialView("Create");
        }

        //
        // POST: /Prescription/Create
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
        // GET: /Prescription/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /Prescription/Edit/5
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
        // GET: /Prescription/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /Prescription/Delete/5
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
