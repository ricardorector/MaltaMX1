//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace malta.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class usuario
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public usuario()
        {
            this.cotizacion = new HashSet<cotizacion>();
        }
    
        public int Id { get; set; }
        public int IdDIstribuidor { get; set; }
        public int IdPlanta { get; set; }
        public string Usuario1 { get; set; }
        public string Contrasenia { get; set; }
        public double Descuento { get; set; }
        public bool PrimeraContrasenia { get; set; }
        public Nullable<System.DateTime> FechaCambioContrasenia { get; set; }
        public string Guid { get; set; }
        public Nullable<System.DateTime> FechaGuid { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<cotizacion> cotizacion { get; set; }
        public virtual planta planta { get; set; }
    }
}
