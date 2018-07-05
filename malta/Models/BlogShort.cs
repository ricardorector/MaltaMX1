using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace malta.Models
{
    public class BlogShort
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Imagen { get; set; }
        public string Descripcion { get; set; }
        public string Etiquetas { get; set; }
        public string Especies { get; set; }
        public string Tipo { get; set; }
        public string Autor { get; set; }
    }
}