using System.Collections.Generic;
using System.Web.Mvc;
using iTextSharp.text;
using System.Linq;
using MvcRazorToPdf;
using SmileMakersApp.Models;
using System.IO;

namespace SmileMakersApp.Controllers
{
    public class PdfController : Controller
    {
        private SmileMakersAppDataEntities db = new SmileMakersAppDataEntities();

        public ActionResult ShowPdf(int id)
        {
            var query = from p in db.Prescriptions
                        where p.id == id
                        select p;

            int pid = query.FirstOrDefault().id;
            string date = query.FirstOrDefault().prescription_date;
            string advice = query.FirstOrDefault().advice;
            string exam = query.FirstOrDefault().oral_examination;
            string history = query.FirstOrDefault().medical_history;
            string investigation = query.FirstOrDefault().investigation;
            string name = query.FirstOrDefault().Patient.name;
            string contact = query.FirstOrDefault().Patient.contact;
            ICollection<PrescribedTreatment> treatments = query.FirstOrDefault().PrescribedTreatments;
            var model = new Prescription
            {
                id = id,
                prescription_date = date,
                advice = advice,
                oral_examination = exam,
                medical_history = history,
                investigation = investigation,
                Patient = new Patient
                {
                    name = name,
                    contact = contact
                },
                PrescribedTreatments = treatments
            };
            return new PdfActionResult(model);
        }

        public ActionResult ShowCharges(int id)
        {
            var query = from p in db.Prescriptions
                        where p.id == id
                        select p;

            int pid = query.FirstOrDefault().id;
            string name = query.FirstOrDefault().Patient.name;
            string contact = query.FirstOrDefault().Patient.contact;
            ICollection<ConsultationCharge> charges = query.FirstOrDefault().ConsultationCharges;
            var model = new Prescription
            {
                id = id,
                Patient = new Patient
                {
                    name = name,
                    contact = contact
                },
                ConsultationCharges = charges
            };
            return new PdfActionResult(model);
        }

        public ActionResult SaveToAppData()
        {
            var model = new PdfExample
            {
                Heading = "Heading",
                Items = new List<BasketItem>
                {
                    new BasketItem
                    {
                        Id = 1,
                        Description = "Item 1",
                        Price = 1.99m
                    },
                    new BasketItem
                    {
                        Id = 2,
                        Description = "Item 2",
                        Price = 2.99m
                    }
                }
            };
            byte[] pdfOutput = ControllerContext.GeneratePdf(model, "IndexWithAccessToDocumentAndWriter");
            string fullPath = Server.MapPath("~/App_Data/FreshlyMade.pdf");

            if (System.IO.File.Exists(fullPath))
            {
                System.IO.File.Delete(fullPath);
            }
            System.IO.File.WriteAllBytes(fullPath, pdfOutput);

            return View("SaveToAppData");
        }

        public ActionResult IndexWithAccessToDocumentAndWriter()
        {
            var model = new PdfExample
            {
                Heading = "Heading",
                Items = new List<BasketItem>
                {
                    new BasketItem
                    {
                        Id = 1,
                        Description = "Item 1",
                        Price = 1.99m
                    },
                    new BasketItem
                    {
                        Id = 2,
                        Description = "Item 2",
                        Price = 2.99m
                    }
                }
            };
            return new PdfActionResult(model, (writer, document) =>
            {
                document.SetPageSize(new Rectangle(500f, 500f, 90));
                document.NewPage();
            });
        }

        public ActionResult IndexWithAccessToDocumentAndWriterDownloadFile()
        {
            var model = new PdfExample
            {
                Heading = "Heading",
                Items = new List<BasketItem>
                {
                    new BasketItem
                    {
                        Id = 1,
                        Description = "Item 1",
                        Price = 1.99m
                    },
                    new BasketItem
                    {
                        Id = 2,
                        Description = "Item 2",
                        Price = 2.99m
                    }
                }
            };
            return new PdfActionResult(model, (writer, document) =>
            {
                document.SetPageSize(new Rectangle(500f, 500f, 90));
                document.NewPage();
            })
            {
                FileDownloadName = "ElanWasHere.pdf"
            };
        }
    }
}