
namespace malta.Controllers
{
    using BL;
    using malta.Models;
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Web.Mvc;

    // Controlador de las vistas para blog de noticias y articulos
    public class BlogController : Controller
    {
        #region Members

        #endregion

        public BlogController()
        {
          
        }

        private MaltaDBEntities db = new MaltaDBEntities();//se hace instancia a la bd

        /// <summary>
        /// la funcion index trae por default a todos los contenidos de tipo articulo de la tabla blog
        /// </summary>
        /// <param name="idespecie"> separado por pipes para saber que especie o especies son buscadas</param>
        /// <param name="tipo"> tenemos dos tipos en la tabla blog </param>
        /// <returns></returns>
        public ActionResult Index(string idespecie = "|0|", string tipo = "articulos")
        {


            string[] split = idespecie.Split('|');///utilizamos doble pipe para separar el numero de la especie, ya sea 1,2,3... etc
            string where = "";
            int count = 0;
            ///si el idespecie que se recibio de parametro es unicamente 0 en el query no tomaremos ese parametro
            ///para el where
            if (idespecie.Equals("|0|"))
            {
                where = "";
                where = "([Extent1].[Tipo] = 'articulos') ";
            }
            else
            {
                where = "";//si se recibio un idespecie diferente a 0, significa que puede contener uno o mas idespecie el articulo e
                //entonces hacemos un foreach para recorer cada idespecie y añadirlo al where
                foreach (string item in split)
                {
                    if (!item.Equals(""))
                    {
                        if (count == 0)
                        {
                            where += "([Extent1].[Especies] LIKE '%|" + item + "|%' ESCAPE '~')";
                            idespecie = item;
                        }
                        else
                        {
                            where += "OR ([Extent1].[Especies] LIKE '%|" + item + "|%' ESCAPE '~') ";
                        }
                        count++;
                    }

                }
                string final = "(" + where + ") AND ([Extent1].[Tipo] = 'articulos' )";
                where = final;
            }



            IEnumerable<BlogShort> lst_data = db.Database.SqlQuery<BlogShort>("SELECT [Project1].[Id] AS[Id], [Project1].[Titulo] AS[Titulo],[Project1].[Imagen] AS[Imagen], [Project1].[Descripcion] AS[Descripcion], [Project1].[Etiquetas] AS[Etiquetas], [Project1].[Especies] AS[Especies] FROM(SELECT [Extent1].[Id] AS[Id], [Extent1].[Fecha] AS[Fecha], [Extent1].[Titulo] AS[Titulo], [Extent1].[Descripcion] AS[Descripcion], [Extent1].[Etiquetas] AS[Etiquetas], [Extent1].[Imagen] AS[Imagen], [Extent1].[Especies] AS[Especies] FROM [dbo].[blog] AS[Extent1] WHERE  " + where + ")  AS[Project1] ORDER BY[Project1].[Fecha] ASC");
            //listamos todos los resultados del query y los pasamos como variable a travez del viewbag
            ViewBag.lst_data = lst_data.ToList();
            int numero = lst_data.ToList().Count;
            ViewBag.numero = numero;


            string img_especie = "";
            if (idespecie.Equals("|0|"))//si el idespecie es 0, ponemos de imagen background en la busqueda el bg de logo malta
            {
                ViewBag.nombre_especie = "Todas las especies ";
                ViewBag.img_especie = "Content/img/imago-malta.svg";
            }
            else
            {
                //si hay un idespecie, entonces buscamos la imagen background correspondiente a la especie seleccionada
                IEnumerable<especies> especie_query = db.Database.SqlQuery<especies>("SELECT * FROM especies WHERE Id=" + idespecie);

                var primer_especie = new malta.Models.especies();
                primer_especie = especie_query.ToList()[0];
                img_especie = primer_especie.Icono;
                ViewBag.nombre_especie = primer_especie.Nombre;
                ViewBag.img_especie = img_especie;
            }
            nav();//llamamos a la funcion nav que nos ayuda a generar el menu lateral izquierdo
            return View();
        }

        /// <summary>
        /// Trae todos los articulos o noticias relacionados a una etiqueta
        /// </summary>
        /// <param name="etiqueta">nombre de la etiqueta seleccionada</param>
        /// <param name="tipo">puede ser articulos o noticias</param>
        /// <returns></returns>
        public ActionResult Etiqueta(string etiqueta = "", string tipo = "articulos")
        {
            ///seleccionamos de la tabla blog y traemos toda la informacion ordenada por fecha
            var lst_data = from p in db.blog
                           orderby p.Fecha ascending
                           select new BlogShort
                           {
                               Id = p.Id,
                               Titulo = p.Titulo,
                               Imagen = p.Imagen,
                               Descripcion = p.Descripcion,
                               Etiquetas = p.Etiquetas,
                               Especies = p.Especies,
                               Tipo = p.Tipo
                           };
            //filtramos la lista donde se contenga el tipo y la etiqueta recibida
            lst_data = lst_data.Where(s => s.Etiquetas.Contains(etiqueta)).Where(s => s.Tipo.Equals(tipo));
            ViewBag.lst_data = lst_data.ToList();
            int numero = lst_data.ToList().Count;
            ViewBag.numero = numero;
            string idespecie2 = "14";
            if (numero > 0)
            {
                var primer_icono = new malta.Models.BlogShort();
                primer_icono = lst_data.ToList()[0];
                string[] split = (primer_icono.Especies).Split('|');

                foreach (string s in split)
                {
                    if (!s.Equals(""))
                    {
                        idespecie2 = s;
                        continue;
                    }
                }
            }
            string img_especie = "";

            IEnumerable<especies> especie_query = db.Database.SqlQuery<especies>("SELECT * FROM especies WHERE Id=" + idespecie2);

            var primer_especie = new malta.Models.especies();
            primer_especie = especie_query.ToList()[0];
            img_especie = primer_especie.Icono;

            ViewBag.img_especie = img_especie;

            nav();//llamamos a la funcion nav que nos ayuda a generar el menu lateral izquierdo
            return View();
        }

        /// <summary>
        /// Vista detallada de un articulo o notica
        /// </summary>
        /// <param name="id"> identificador del articulo o noticia en la tabla</param>
        /// <param name="tipo">variable para distingir atriculo o noticia</param>
        /// <returns>informacion del blog</returns>
        public ActionResult Ficha(int id = 1, string tipo = "articulos")
        {
            IEnumerable<blog> lst_data = db.Database.SqlQuery<blog>("SELECT * FROM blog WHERE Tipo= '" + tipo + "' and  Id=" + id);


            var send_productos = new malta.Models.blog();
            if (lst_data.ToList().Count > 0)
            {
                send_productos = lst_data.ToList()[0];
            }
            ViewBag.lst_data = send_productos;
            int numero = lst_data.ToList().Count;

            string idespecie2 = "14";
            if (numero > 0)
            {
                var primer_icono = new malta.Models.blog();
                primer_icono = lst_data.ToList()[0];
                string[] split = (primer_icono.Especies).Split('|');

                foreach (string s in split)
                {
                    if (!s.Equals(""))
                    {
                        idespecie2 = s;
                        continue;
                    }
                }
            }
            string img_especie = "";

            IEnumerable<especies> especie_query = db.Database.SqlQuery<especies>("SELECT * FROM especies WHERE Id=" + idespecie2);

            var primer_especie = new malta.Models.especies();
            try
            {
                primer_especie = especie_query.ToList()[0];
                img_especie = primer_especie.Icono;

            }
            catch (Exception) { }


            ViewBag.img_especie = img_especie;

            nav();
            return View();
        }

        /// <summary>
        /// Funcion para obtener una lista completa de todas las noticias y mandarlas
        /// directamente a la vista Noticias
        /// </summary>
        /// <returns>lista noticias</returns>
        public ActionResult Noticias()
        {

            IEnumerable<BlogShort> lst_data = db.Database.SqlQuery<BlogShort>("SELECT [Project1].[Id] AS[Id], [Project1].[Titulo] AS[Titulo],[Project1].[Imagen] AS[Imagen], [Project1].[Descripcion] AS[Descripcion], [Project1].[Etiquetas] AS[Etiquetas], [Project1].[Especies] AS[Especies] FROM(SELECT [Extent1].[Id] AS[Id], [Extent1].[Fecha] AS[Fecha], [Extent1].[Titulo] AS[Titulo], [Extent1].[Descripcion] AS[Descripcion], [Extent1].[Etiquetas] AS[Etiquetas], [Extent1].[Imagen] AS[Imagen], [Extent1].[Especies] AS[Especies] FROM[dbo].[blog] AS[Extent1] WHERE  Tipo='noticias')  AS[Project1] ORDER BY[Project1].[Fecha] ASC");

            ViewBag.lst_data = lst_data.ToList();
            int numero = lst_data.ToList().Count;
            ViewBag.numero = numero;
            nav();
            return View();
        }

        public void switchNav()
        {
            string html = "";
            IEnumerable<EspeciesNav> data = db.Database.SqlQuery<EspeciesNav>("SELECT Tipo, Icono FROM especies WHERE Orden=1 ");
            foreach (var item in data.ToList())
            {
                html += "<a class=\"switchNav\" ><img src=\"" + @Url.Content("~/") + item.Icono + "\" ><span class=\"text-link\" > " + item.Tipo + "</span></a>";
            }
            ViewBag.switchNav = html;
        }

        public void nav()
        {
            switchNav();
            string html = "";
            string nav_close = "#nav-nosotros,";
            string switch_nav = "";
            IEnumerable<EspeciesNav> data = db.Database.SqlQuery<EspeciesNav>("SELECT Tipo, Icono FROM especies WHERE Orden=1 ");
            int cont = 1;

            foreach (var item in data.ToList())
            {
                nav_close += "#nav-" + item.Tipo + ",";
                switch_nav += "case " + cont + ":$('#nav-" + item.Tipo + "').toggleClass('nav-open');break; \n";
                cont++;
                var especiefor = from m in db.especies select m;
                especiefor = especiefor.Where(s => s.Tipo.Contains(item.Tipo));
                html += "<div id=\"nav-" + item.Tipo + "\" class=\"nav-especie\" > ";
                html += "<h2>" + item.Tipo + "</h2>";
                html += "<a class=\"closebtn\"> &times;</a>";
                foreach (var especieitem in (List<malta.Models.especies>)especiefor.ToList())
                {
                    html += "<a href =\"/Productos/especie?id_especie=" + especieitem.Id + " \" ><img src=" +
                        @Url.Content("~/") + especieitem.Icono + " ><span class=\"text-link\">" +
                        especieitem.Nombre + "</span></a>";
                }
                html += " </div>";
            }
            ViewBag.nav = html;
            ViewBag.nav_close = nav_close.Substring(0, nav_close.Length - 1);
            ViewBag.switch_nav = switch_nav;
        }

        [HttpGet]
        public JsonResult Slider(int Index = 1)
        {
            var bl = new NewsBl();


            var result = bl.Slider(Index);

            return Json(new
            {
                result,
                isCorrect = bl.IsCorrect,
                message = bl.Message
            },
            JsonRequestBehavior.AllowGet);
        }
    }
}
