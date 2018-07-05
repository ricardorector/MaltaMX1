using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace malta.Models
{
    public class ProductoJoin
    {
        public int Id { get; set; }
        public string Id_linea { get; set; }
        public string Linea_nombre { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Imagen { get; set; }
        public string Brochure { get; set; }
        public string Vademecum { get; set; }
        public string Video { get; set; }
        public string Params_dist { get; set; }
        public string Proteina { get; set; }
        public string Grasa { get; set; }
        public string Humedad { get; set; }
        public string Ceniza { get; set; }
        public string Eln { get; set; }
        public string Fibra { get; set; }


        public string Especie { get; set; }
        public string Id_especie { get; set; }
        public string Marca { get; set; }
        public string Id_marca { get; set; }

        public string Marca_background { get; set; }
        public string Marca_imagen { get; set; }
        public string Especie_imagen { get; set; }
        public string Especie_plan { get; set; }

        public string Detalle_tipo { get; set; }
        public string Detalle_descripcion { get; set; }
        public string Detalle_imagen { get; set; }
        public string Detalle_Plan { get; set; }
    }
}