using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace malta.Models
{
    public class ProductosBuscador
    {
        public int Id { get; set; }
        public string Id_linea { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Imagen { get; set; }

        public string Marca_nombre { get; set; }
        public string Marca_descripcion { get; set; }

        public string Especie_nombre { get; set; }
        public string Especie_descripcion { get; set; }


        public string Marca_background { get; set; }
        public string Marca_imagen { get; set; }

        public string Especie_imagen { get; set; }
    }
}