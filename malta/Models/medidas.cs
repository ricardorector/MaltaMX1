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
    
    public partial class medidas
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public medidas()
        {
            this.cotizacionDetalle = new HashSet<cotizacionDetalle>();
            this.precios = new HashSet<precios>();
        }
    
        public int Id { get; set; }
        public string Nombre { get; set; }
        public double Kilos { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<cotizacionDetalle> cotizacionDetalle { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<precios> precios { get; set; }
    }
}
