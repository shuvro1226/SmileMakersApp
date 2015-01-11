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
    
    public partial class Prescription
    {
        public Prescription()
        {
            this.Consultations = new HashSet<Consultation>();
        }
    
        public int id { get; set; }
        public string patient_name { get; set; }
        public int patient_age { get; set; }
        public string patient_contact { get; set; }
        public System.DateTime prescription_date { get; set; }
        public string oral_examination { get; set; }
        public string medical_history { get; set; }
        public string investigation { get; set; }
        public string advice { get; set; }
        public string treatment { get; set; }
        public string next_task { get; set; }
        public Nullable<int> surgeon_charge { get; set; }
        public Nullable<int> assisstant_charge { get; set; }
        public Nullable<int> ot_charge { get; set; }
        public Nullable<int> suction_tube { get; set; }
        public Nullable<int> gloves { get; set; }
        public Nullable<int> sterilization_cost { get; set; }
        public Nullable<int> needle { get; set; }
        public Nullable<int> remar_file { get; set; }
        public Nullable<int> bar { get; set; }
        public Nullable<int> polishing_bar { get; set; }
        public Nullable<int> polishing_paste { get; set; }
        public string appointment_date { get; set; }
        public string appointment_time { get; set; }
    
        public virtual ICollection<Consultation> Consultations { get; set; }
    }
}
