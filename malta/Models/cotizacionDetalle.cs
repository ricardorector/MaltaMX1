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
    
    public partial class cotizacionDetalle
    {
        public int IdCotizacion { get; set; }
        public int IdProducto { get; set; }
        public int IdMedida { get; set; }
        public decimal Cantidad { get; set; }
        public decimal Unitario { get; set; }
        public decimal Precio { get; set; }
    
        public virtual cotizacion cotizacion { get; set; }
        public virtual medidas medidas { get; set; }
        public virtual productos productos { get; set; }
    }
}
