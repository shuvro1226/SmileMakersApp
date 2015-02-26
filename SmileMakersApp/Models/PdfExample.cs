using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SmileMakersApp.Models
{
    public class PdfExample
    {
        public string Heading { get; set; }
        public IEnumerable<BasketItem> Items { get; set; }
    }
}