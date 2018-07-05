using System;
using System.Web.Mvc;
using malta.Models;
using System.Linq;
using System.Collections.Generic;

namespace malta.Controllers
{
    public class HomeController : Controller
    {
        MaltaDBEntities db = new MaltaDBEntities();
        public ActionResult Index()
        {
            IEnumerable<BlogShort> lst_data = db.Database.SqlQuery<BlogShort>("SELECT TOP 1 * FROM blog WHERE especies LIKE '%|noticia_home|%' ORDER BY Orden DESC");
            int numero = lst_data.ToList().Count;
            ViewBag.numero = numero;

            if (numero > 0)
            {
               var lista = lst_data.ToList();

                ViewBag.nota_img = lista[0].Imagen;
                ViewBag.nota_id = lista[0].Id + "";
                ViewBag.nota_titulo = lista[0].Titulo;
                ViewBag.nota_autor = lista[0].Autor;
            }

            var data = db.Database.SqlQuery<especies>("SELECT * FROM especies order by OrdenTipo ASC ");
            
            ViewBag.nav_blog = data.ToList();

            nav();

            return View();
        }
        public ActionResult MapaSitio()
        {
            nav();
            return View();
        }
        public ActionResult Cursos()
        {
            nav();
            return View();
        }
        
        public ActionResult Plantas()
        {
            nav();
            return View();
        }
        
        public ActionResult Nosotros()
        {
            nav();            
            return View();
        }
        public ActionResult DondeComprar()
        {
            nav();            
            return View();
        }
        public ActionResult BolsaTrabajo()
        {
            nav();            
            return View();
        }
        
        public ActionResult AvisoPrivacidad()
        {
            nav();            
            return View();
        }
        public ActionResult Salud()
        {
            var lst_productos = from p in db.salud
                                where p.Tipo== "Medicamento"
                                orderby p.Nombre ascending
                                select new SaludLista
                                {
                                    Id = p.Id,
                                    Nombre = p.Nombre,
                                    Imagen = p.Imagen
                                };
            ViewBag.Lst_productos = lst_productos.ToList();
            int numero = lst_productos.ToList().Count;
            ViewBag.numero = numero;

            nav();
            return View();
        }
        
        public ActionResult FichaSalud(int id_salud = 1)
        {
            var lst_productos = from a in db.salud
                                join b in db.detalles_salud on a.Id equals b.Id_salud
                                where b.Id_salud == id_salud
                                select new SaludCompleto
                                {
                                    Id = a.Id,
                                    Nombre = a.Nombre,
                                    Descripcion = a.Descripcion,
                                    Imagen = a.Imagen,
                                    Tipo = a.Tipo,
                                    Indicaciones = a.Indicaciones,
                                    Contraindicaciones = a.Contraindicaciones,
                                    Administracion = a.Administracion,
                                    Interaccion = a.Interaccion,
                                    Reacciones = a.Reacciones,
                                    Uso = a.Uso,
                                    Brochure = a.Brochure,
                                    Vademecum = a.Vademecum,
                                    Video = a.Video,
                                    Params_dist = a.Params_dist,
                                    Id_salud = b.Id_salud.ToString(),
                                    TipoDetalle = b.Tipo,
                                    DescripcionDetalle = b.Descripcion,
                                    ImagenDetalle = b.Imagen,
                                };

            
            
            ViewBag.lst_productos = lst_productos.ToList();
            int numero = lst_productos.ToList().Count;
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
                html += "<a class=\"switchNav\" ><img src=\""+ @Url.Content("~/") + item.Icono+ "\" ><span class=\"text-link\" > " + item.Tipo + "</span></a>";
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
                nav_close += "#nav-" + item.Tipo+",";
                switch_nav += "case "+cont+":$('#nav-"+ item.Tipo + "').toggleClass('nav-open');break; \n";
                cont++;
                var especiefor = from m in db.especies select m;
                especiefor = especiefor.Where(s => s.Tipo.Contains(item.Tipo));
                html += "<div id=\"nav-"+ item.Tipo + "\" class=\"nav-especie\" > ";
                    html += "<h2>"+ item.Tipo + "</h2>";
                    html += "<a class=\"closebtn\"> &times;</a>";
                foreach (var especieitem in (List<malta.Models.especies>)especiefor.ToList())
                    {
                    html += "<a href =\"/Productos/especie?id_especie="+ especieitem.Id+" \" ><img src="+
                        @Url.Content("~/")+ especieitem.Icono+ " ><span class=\"text-link\">"+
                        especieitem.Nombre+"</span></a>";
                }
                html += " </div>";
            }
            ViewBag.nav = html;
            ViewBag.nav_close = nav_close.Substring(0,nav_close.Length-1);
            ViewBag.switch_nav = switch_nav;

            /*
            var mascotas = from m in db.especies select m;
            mascotas = mascotas.Where(s => s.Tipo.Contains("mascotas"));

            var pecuario = from m in db.especies select m;
            pecuario = pecuario.Where(s => s.Tipo.Contains("pecuario"));

            var aves = from m in db.especies select m;
            aves = aves.Where(s => s.Tipo.Contains("aves"));

            var acuacultura = from m in db.especies select m;
            acuacultura = acuacultura.Where(s => s.Tipo.Contains("acuacultura"));

            ViewBag.Mascotas = mascotas.ToList();
            ViewBag.Pecuario = pecuario.ToList();
            ViewBag.Aves        = aves.ToList();
            ViewBag.Acuacultura = acuacultura.ToList();
            */
        }
    }
}