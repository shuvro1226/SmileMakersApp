﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class SmileMakersAppDataEntities : DbContext
    {
        public SmileMakersAppDataEntities()
            : base("name=SmileMakersAppDataEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<ConsultationCharge> ConsultationCharges { get; set; }
        public virtual DbSet<ConsultedTreatment> ConsultedTreatments { get; set; }
        public virtual DbSet<Patient> Patients { get; set; }
        public virtual DbSet<PrescribedTreatment> PrescribedTreatments { get; set; }
        public virtual DbSet<Treatment> Treatments { get; set; }
        public virtual DbSet<Appointment> Appointments { get; set; }
        public virtual DbSet<Consultation> Consultations { get; set; }
        public virtual DbSet<Prescription> Prescriptions { get; set; }
    }
}
