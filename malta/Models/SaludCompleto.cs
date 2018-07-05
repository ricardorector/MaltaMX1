using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace malta.Models
{
    public class SaludCompleto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Imagen { get; set; }
        public string Tipo { get; set; }
        public string Indicaciones { get; set; }
        public string Contraindicaciones { get; set; }
        public string Administracion { get; set; }
        public string Interaccion { get; set; }
        public string Reacciones { get; set; }
        public string Uso { get; set; }
        public string Brochure { get; set; }
        public string Vademecum { get; set; }
        public string Video { get; set; }
        public string Params_dist { get; set; }
        public string Id_salud { get; set; }
        public string TipoDetalle { get; set; }
        public string DescripcionDetalle { get; set; }
        public string ImagenDetalle { get; set; }
    }
}