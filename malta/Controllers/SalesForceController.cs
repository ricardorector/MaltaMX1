using malta.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace malta.Controllers
{
    public class SalesForceController : Controller
    {
        private MaltaDBEntities db = new MaltaDBEntities();
        public ActionResult Vuelvete_distribuidor()
        {
            nav();
            return View();
        }

        public ActionResult Contacto()
        {
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
    }
}