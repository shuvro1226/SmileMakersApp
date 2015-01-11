//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SmileMakersApp.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Consultation
    {
        public int id { get; set; }
        public Nullable<int> prescription_id { get; set; }
        public string consultation_date { get; set; }
        public Nullable<int> payment_recieved { get; set; }
        public Nullable<int> payment_left { get; set; }
        public string work_done { get; set; }
        public string upper_left { get; set; }
        public string upper_right { get; set; }
        public string lower_left { get; set; }
        public string lower_right { get; set; }
        public string next_task { get; set; }
    
        public virtual Prescription Prescription { get; set; }
    }
}