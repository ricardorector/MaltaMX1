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
    
    public partial class plantilla
    {
        public int Id { get; set; }
        public int IdPlanta { get; set; }
        public string Contenido { get; set; }
        public short Tipo { get; set; }
    
        public virtual planta planta { get; set; }
    }
}
