using malta.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Device.Location;

namespace malta.Controllers
{
    public class DistribuidorController : Controller
    {
        // GET: Distribuidor
        public ActionResult Index()
        {
            IEnumerable<DistribuidorEstado> lst_estados = db.Database.SqlQuery<DistribuidorEstado>("SELECT   Estado FROM distribuidores group by Estado order by Estado");
            ViewBag.lst_estados = lst_estados.ToList();
            string html_estados = "";
            string estado1 = "";
            foreach(var estado in lst_estados.ToList())
            {
                if (estado1.Equals("")) { estado1 = estado.Estado; }
                html_estados += "<option>"+estado.Estado+"</option>";
            }
            ViewBag.html_estados = html_estados;

            IEnumerable<DistribuidorCiudad> lst_ciudades = db.Database.SqlQuery<DistribuidorCiudad>("SELECT Estado, Ciudad FROM distribuidores WHERE Estado='"+estado1+"' group by Ciudad,Estado order by Ciudad ");
            ViewBag.lst_ciudades = lst_ciudades.ToList();
            string html_ciudades = "";
            
            foreach (var ciudad in lst_ciudades.ToList())
            {                
                html_ciudades += "<option>" + ciudad.Ciudad + "</option>";
            }
            ViewBag.html_ciudades = html_ciudades;


            IEnumerable<DistribuidorCiudad> lst_ciudadest = db.Database.SqlQuery<DistribuidorCiudad>("SELECT Estado, Ciudad FROM distribuidores group by Ciudad,Estado order by Ciudad ");
            ViewBag.lst_ciudadest = lst_ciudadest.ToList();
            string html_ciudadest = "";

            foreach (var ciudad in lst_ciudadest.ToList())
            {
                html_ciudadest += "{Ciudad:" +'"'+ ciudad.Ciudad + '"' + ", Estado:" + '"' + ciudad.Estado + '"' + "},";
            }
            ViewBag.html_ciudadest = html_ciudadest;
            

            nav();
            return View();
        }
        public ActionResult Construccion()
        {
            IEnumerable<DistribuidorEstado> lst_estados = db.Database.SqlQuery<DistribuidorEstado>("SELECT   Estado FROM distribuidores group by Estado order by Estado");
            ViewBag.lst_estados = lst_estados.ToList();
            string html_estados = "";
            string estado1 = "";
            foreach (var estado in lst_estados.ToList())
            {
                if (estado1.Equals("")) { estado1 = estado.Estado; }
                html_estados += "<option>" + estado.Estado + "</option>";
            }
            ViewBag.html_estados = html_estados;

            IEnumerable<DistribuidorCiudad> lst_ciudades = db.Database.SqlQuery<DistribuidorCiudad>("SELECT Estado, Ciudad FROM distribuidores WHERE Estado='" + estado1 + "' group by Ciudad,Estado order by Ciudad ");
            ViewBag.lst_ciudades = lst_ciudades.ToList();
            string html_ciudades = "";

            foreach (var ciudad in lst_ciudades.ToList())
            {
                html_ciudades += "<option>" + ciudad.Ciudad + "</option>";
            }
            ViewBag.html_ciudades = html_ciudades;


            IEnumerable<DistribuidorCiudad> lst_ciudadest = db.Database.SqlQuery<DistribuidorCiudad>("SELECT Estado, Ciudad FROM distribuidores group by Ciudad,Estado order by Ciudad ");
            ViewBag.lst_ciudadest = lst_ciudadest.ToList();
            string html_ciudadest = "";

            foreach (var ciudad in lst_ciudadest.ToList())
            {
                html_ciudadest += "{Ciudad:" + '"' + ciudad.Ciudad + '"' + ", Estado:" + '"' + ciudad.Estado + '"' + "},";
            }
            ViewBag.html_ciudadest = html_ciudadest;


            nav();
            return View();
        }
        public ActionResult Red()
        {
            nav();
            return View();
        }
        private static double Radians(double degrees)
        {
            return (0.017453292519943295 * degrees);
        }
        public static double DistanceBetweenPlaces(double lon1, double lat1, double lon2, double lat2)
        {
            double R = 6371; // km

            double sLat1 = Math.Sin(Radians(lat1));
            double sLat2 = Math.Sin(Radians(lat2));
            double cLat1 = Math.Cos(Radians(lat1));
            double cLat2 = Math.Cos(Radians(lat2));
            double cLon = Math.Cos(Radians(lon1) - Radians(lon2));

            double cosD = sLat1 * sLat2 + cLat1 * cLat2 * cLon;

            double d = Math.Acos(cosD);

            double dist = R * d;

            return dist;
        }
        public string lista_distribuidores(string lat1, string lon1)
        {

            IEnumerable<DistribuidorNombre> lst_dist =
                db.Database.SqlQuery<DistribuidorNombre>("SELECT Id, Nombre_com,Latitud,Longitud FROM distribuidores");
            ViewBag.lst_dist = lst_dist.ToList();

            string html = "";

            foreach (var data in lst_dist.ToList())
            {
               
                try
                {
                    double l1 = double.Parse(lat1);
                    double lo1 = double.Parse(lon1);
                    double l2 = double.Parse(data.Latitud.ToString());
                    double lo2 = double.Parse(data.Longitud.ToString());

                    double result = DistanceBetweenPlaces(l1, lo1, l2, lo2);
                    if (result < 31)
                    {
                        html += "<div class='column'>" +
                               "<h4>" + data.Nombre_com + "</h4>" +
                               "<p><a class='button small' data-open='distribuidor' onclick='datos(" + data.Id + ")'>Ver datos</a></p>" +
                           "</div>";
                    }
                }
                catch (Exception)
                {

                }
                
                
            }


            return html;
        }
        public string lista_distribuidores2(string estado, string ciudad)
        {
            
            IEnumerable<DistribuidorNombre> lst_dist =
                db.Database.SqlQuery<DistribuidorNombre>("SELECT Id, Nombre_com FROM distribuidores WHERE Estado='" + estado+ "' and Ciudad='" + ciudad + "'");
            ViewBag.lst_dist = lst_dist.ToList();

            string html = "";

            foreach (var data in lst_dist.ToList())
            {
                html += "<div class='column'>" +
                            "<h4>"+data.Nombre_com+"</h4>" +
                            "<p><a class='button small' data-open='distribuidor' onclick='datos("+data.Id+")'>Ver datos</a></p>" +
                        "</div>";   
            }
            

            return html;
        }

        public string info_distribuidor(string id)
        {
            IEnumerable<distribuidores> data = db.Database.SqlQuery<distribuidores>("SELECT * FROM distribuidores WHERE Id="+id);            
            string html = "";
            foreach (var dt in data.ToList())
            {
                /*
                html = "<div class='large-4 medium-4 columns'>" +
                            "<h4>"+dt.Nombre_com+"</h4>" +
                            "<p class='direccion'>" + dt.Nombre_fact + "</p>" +
                            "<p class='direccion'>" + dt.Direccion +""+ dt.Barrio + "</p>" +
                            
                            "<p class='cp'>C.P. " + dt.C_P +", "+dt.Ciudad + ", " + dt.Estado + "</p>" +
                            "<p class='telefono'>" + dt.Telefono +" Cel:"+dt.Celular + "</p>" +
                            "<p class='correo'><a href=''>" + dt.Mail + "</a></p>" +
                            "<p class='direccion'>" + dt.Horario + "</p>" +
                        "</div>" +
                        "<div class='large-8 medium-8 columns'>" +
                            "<div class='mapa-distribuidor'>" +
                            "<iframe src='" +  dt.Mapa + "' frameborder='0' target='_parent' style='border:0' allowfullscreen></iframe>" +
                        "</div>" ;
                */
                html = "{Nombre_com:" + '"' + dt.Nombre_com + '"' 
                        + ", Nombre_fact:" + '"' + dt.Nombre_fact + '"'
                        + ", Direccion:" + '"' + dt.Direccion + '"'
                        + ", Barrio:" + '"' + dt.Barrio + '"'
                        + ", C_P:" + '"' + dt.C_P + '"'
                        + ", Ciudad:" + '"' + dt.Ciudad + '"'
                        + ", Estado:" + '"' + dt.Estado + '"'
                        + ", Telefono:" + '"' + dt.Telefono + '"'
                        + ", Celular:" + '"' + dt.Celular + '"'
                        + ", Mail:" + '"' + dt.Mail + '"'
                        + ", Horario:" + '"' + dt.Horario + '"'
                        + ", Mapa:" + '"' + dt.Mapa + '"'
                        + ", Latitud:" + '"' + dt.Latitud + '"'
                        + ", Longitud:" + '"' + dt.Longitud + '"'

                        + "},";
            }

            return html;
        }
        

        private MaltaDBEntities db = new MaltaDBEntities();

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