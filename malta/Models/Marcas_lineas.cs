using System.Data.Entity;

namespace malta.Models
{
    public class Marcas_lineas
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Imagen { get; set; }
        public string Nombre_linea { get; set; }
        public string Nombre_especie { get; set; }
        public string Id_especie { get; set; }
        public string Id_linea { get; set; }

        public string Imagen_especie { get; set; }
        public string Background_especie { get; set; }
        public string Tipo { get; set; }
        public string Marca_lineas { get; set; }
        public string Plan { get; set; }
        public string Slogan { get; set; }
    }
    
}