namespace malta.Controllers
{
    using malta.Models;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;

    public class PrevisionController : Controller
    {

        private MaltaDBEntities db = new MaltaDBEntities();

        public ActionResult Index()
        {
            this.Nav();

            return View();
        }

        public ActionResult Porcino()
        {
            this.Nav();

            return View();
        }

        private void SwitchNav()
        {
            var html = string.Empty;

            var data = db.Database.SqlQuery<EspeciesNav>("SELECT Tipo, Icono FROM especies WHERE Orden=1 ");

            foreach (var item in data.ToList())
            {
                html += "<a class=\"switchNav\" ><img src=\"" + @Url.Content("~/") + item.Icono + "\" ><span class=\"text-link\" > " + item.Tipo + "</span></a>";
            }

            ViewBag.switchNav = html;
        }

        private void Nav()
        {
            SwitchNav();

            var html = string.Empty;
            var nav_close = "#nav-nosotros,";
            var switch_nav = string.Empty;

            var data = db.Database.SqlQuery<EspeciesNav>("SELECT Tipo, Icono FROM especies WHERE Orden=1 ");
            var cont = 1;

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