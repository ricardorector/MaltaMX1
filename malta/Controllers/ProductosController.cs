using malta.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace malta.Controllers
{
    public class ProductosController : Controller
    {

        private MaltaDBEntities db = new MaltaDBEntities();

        // GET: Productos


        public ActionResult Index()
        {
            nav();
            return View();
        }
        public ActionResult Marca(string especie = "todos")
        {
            ViewBag.especie = especie;

            nav();
            return View();
        }
        public ActionResult Marcas(string especie = "todos")
        {
            nav();
            var lst_marcas = from m in db.marcas
                             join e in db.especies on m.Id_especie equals e.Id
                             join lineas in db.lineas on m.Id equals lineas.Id_marca into gj
                             from subpet in gj.DefaultIfEmpty()
                             orderby m.Orden, subpet.Orden ascending
                             select new Marcas_lineas
                             {
                                 Id = m.Id,
                                 Nombre = m.Nombre,
                                 Id_especie = m.Id_especie.ToString(),
                                 Descripcion = m.Descripcion,
                                 Imagen = m.Imagen,
                                 Imagen_especie = e.Imagen,
                                 Background_especie = e.Background,
                                 Tipo = e.Tipo,
                                 Nombre_linea = (subpet == null ? String.Empty : subpet.Nombre),
                                 Id_linea = (subpet == null ? String.Empty : subpet.Id.ToString()),

                             };
            if (!especie.Equals("todos"))
            {
                lst_marcas = lst_marcas.Where(s => s.Tipo.ToString().Equals(especie));
            }
            

            ViewBag.Lst_marcas = lst_marcas.ToList();
            int numero = lst_marcas.ToList().Count;
            ViewBag.numero = numero;
            return View();
        }
        public ActionResult Especie(int id_especie = 1)
        {
            nav();
            var lst_marcas = from m in db.marcas
                             join e in db.especies on m.Id_especie equals e.Id 
                             join lineas in db.lineas on m.Id equals lineas.Id_marca into gj
                             from subpet in gj.DefaultIfEmpty()
                             orderby m.Orden, subpet.Orden ascending
                             select new Marcas_lineas
                              {
                                 Id = m.Id,
                                 Nombre = m.Nombre,
                                 Id_especie = m.Id_especie.ToString(),
                                 Descripcion = m.Descripcion,
                                 Imagen = m.Imagen,
                                 Slogan=e.Descripcion,
                                 Imagen_especie=e.Imagen,
                                 Background_especie=e.Background,
                                 Nombre_especie=e.Nombre,
                                 Plan=e.Plan,
                                 Nombre_linea = (subpet == null ? String.Empty : subpet.Nombre),
                                 Id_linea = (subpet == null ? String.Empty : subpet.Id.ToString())
                             };

            lst_marcas = lst_marcas.Where(s => s.Id_especie.ToString().Equals(id_especie.ToString()));

            ViewBag.Lst_marcas = lst_marcas.ToList();
            int numero = lst_marcas.ToList().Count;
            ViewBag.numero = numero;
            return View();
        }
        public ActionResult Productos(int id_linea = 1)
        {
            var lst_productos = from p in db.productos
                                join li in db.lineas on p.Id_linea  equals li.Id
                                join m in db.marcas on li.Id_marca equals m.Id 
                                join e in db.especies on m.Id_especie equals e.Id
                                where p.Id_linea == id_linea
                                orderby p.Orden ascending
                                select  new ProductosMarca
                                {
                                    Id = p.Id,
                                    Id_linea =p.Id_linea.ToString(),
                                    Nombre = p.Nombre,
                                    Imagen = p.Imagen,
                                    Marca_nombre = m.Nombre,
                                    Marca_descripcion = m.Descripcion,
                                    Marca_background = m.Background,
                                    Marca_imagen = m.Imagen,
                                    Especie_imagen = e.Imagen,
                                    Especie_id=e.Id.ToString(),
                                    Especie_nombre=e.Nombre,
                                    Linea_id=li.Id.ToString(),
                                    Linea_nombre=li.Nombre,
                                    Linea_descripcion=li.Descripcion,
                                    Slogan=e.Descripcion
                                
                                };

            //lst_productos = lst_productos.Where(s =>s.Id_linea.ToString().Equals(id_linea.ToString()));
            ViewBag.Lst_productos = lst_productos.ToList();
            int numero = lst_productos.ToList().Count;
            ViewBag.numero = numero;
            nav();
            return View();
        }
        public ActionResult Ficha(int id_producto = 1)
        {
            var lst_productos = from p in db.productos                                
                                join li in db.lineas on p.Id_linea equals li.Id
                                join m in db.marcas on li.Id_marca equals m.Id
                                join e in db.especies on m.Id_especie equals e.Id
                                where p.Id == id_producto
                                select new ProductoJoin
                                {
                                    Id = p.Id,                                    
                                    Id_linea = p.Id_linea.ToString(),
                                    Nombre = p.Nombre,
                                    Descripcion = p.Descripcion,
                                    Imagen = p.Imagen,
                                    Brochure = p.Brochure,
                                    Vademecum = p.Vademecum,
                                    Video = p.Video,
                                    Params_dist = p.Params_dist,
                                    Proteina = p.Proteina,
                                    Grasa = p.Grasa,
                                    Humedad = p.Humedad,
                                    Ceniza = p.Ceniza,
                                    Eln = p.Eln,
                                    Marca_background = m.Background,                                    
                                    Especie_imagen = e.Imagen,
                                    Fibra=p.Fibra,
                                    Especie=e.Nombre,
                                    Marca_imagen=m.Imagen,
                                    Id_especie=e.Id.ToString(),
                                    Id_marca=m.Id.ToString(),
                                    Marca=m.Nombre,
                                    Especie_plan=e.Plan,
                                    Linea_nombre=li.Nombre,
                                };

            lst_productos = lst_productos.Where(s => s.Id.Equals(id_producto)).Take(1);
            var send_productos= new malta.Models.ProductoJoin();
            if (lst_productos.ToList().Count > 0)
            {
                send_productos = lst_productos.ToList()[0];
            }
            ViewBag.Lst_productos = send_productos;
            
            var plan = from p in db.detalles_producto
                                where p.Id_producto == id_producto
                                orderby p.Orden ascending
                                select new ProductoJoin
                                {
                                    Detalle_tipo = p.Tipo,
                                    Detalle_descripcion = p.Descripcion,
                                    Detalle_imagen = p.Imagen
                                };

            plan = plan.Where(s => s.Detalle_tipo.ToString().Equals("plan"));
            ViewBag.plan = plan.ToList();

            var beneficio = from p in db.detalles_producto
                            where p.Id_producto == id_producto
                            orderby p.Orden ascending
                            select new ProductoJoin
                                {                              
                                    Detalle_tipo = p.Tipo,
                                    Detalle_descripcion = p.Descripcion,
                                    Detalle_imagen = p.Imagen
                                };

            beneficio = beneficio.Where(s => s.Detalle_tipo.ToString().Equals("beneficio"));            
            ViewBag.beneficio = beneficio.ToList();


            var medicamento = from p in db.detalles_producto
                              where p.Id_producto == id_producto
                              orderby p.Orden ascending
                              select new ProductoJoin
                            {                                
                                Detalle_tipo = p.Tipo,
                                Detalle_descripcion =p.Descripcion,
                                Detalle_imagen = p.Imagen
                            };

            medicamento = medicamento.Where(s => s.Detalle_tipo.ToString().Equals("medicamento"));
            ViewBag.medicamento = medicamento.ToList();

            var presentacion = from p in db.detalles_producto 
                               where p.Id_producto == id_producto
                               orderby p.Orden ascending
                               select new ProductoJoin
                            {
                                
                                Detalle_tipo = p.Tipo,
                                Detalle_descripcion = p.Descripcion,
                                Detalle_imagen = p.Imagen
                            };

            presentacion = presentacion.Where(s => s.Detalle_tipo.ToString().Equals("presentacion"));
            ViewBag.presentacion = presentacion.ToList();


            var indicacion = from p in db.detalles_producto
                              where p.Id_producto == id_producto
                              orderby p.Orden ascending
                              select new ProductoJoin
                              {
                                  Detalle_tipo = p.Tipo,
                                  Detalle_descripcion = p.Descripcion,
                                  Detalle_imagen = p.Imagen
                              };

            indicacion = indicacion.Where(s => s.Detalle_tipo.ToString().Equals("indicacion"));
            ViewBag.indicacion = indicacion.ToList();


            var nutricion = from p in db.detalles_producto
                             where p.Id_producto == id_producto
                             orderby p.Orden ascending
                             select new ProductoJoin
                             {
                                 Detalle_tipo = p.Tipo,
                                 Detalle_descripcion = p.Descripcion,
                                 Detalle_imagen = p.Imagen
                             };

            nutricion = nutricion.Where(s => s.Detalle_tipo.ToString().Equals("nutricion"));
            ViewBag.nutricion = nutricion.ToList();

            nav();
            return View();
        }
        public ActionResult Busqueda(string buscar)
        {
            ViewBag.buscar = buscar;
            string[] split = buscar.Split(' ');
            string where = "";
            foreach(string buscador in split)
            {
                where += " or ([Extent1].[Keyword] LIKE '%" + buscador + "%') ";
            }


            IEnumerable<ProductosBuscador> lst_productos = 
                db.Database.SqlQuery<ProductosBuscador>("SELECT " +
                        "[Extent1].[Id] AS [Id], " +
                        "CASE WHEN ([Extent1].[Id_linea] IS NULL) THEN N'' ELSE  CAST( [Extent1].[Id_linea] AS nvarchar(max)) END AS [C1], " +
                        "[Extent1].[Nombre] AS [Nombre], " +
                        "[Extent1].[Imagen] AS [Imagen], " +
                        "[Extent1].[Descripcion] AS [Descripcion], " +
                        "[Extent3].[Nombre] AS [Nombre1], " +
                        "[Extent3].[Descripcion] AS [Descripcion1], " +
                        "[Extent4].[Nombre] AS [Nombre2], " +
                        "[Extent4].[Descripcion] AS [Descripcion2], " +
                        "[Extent3].[Background] AS [Background], " +
                        "[Extent3].[Imagen] AS [Imagen1], " +
                        "[Extent4].[Imagen] AS [Imagen2]" +
                        "FROM    [dbo].[productos] AS [Extent1]" +
                        "INNER JOIN [dbo].[lineas] AS [Extent2] ON [Extent1].[Id_linea] = [Extent2].[Id]" +
                        "INNER JOIN [dbo].[marcas] AS [Extent3] ON [Extent2].[Id_marca] = [Extent3].[Id]" +
                        "INNER JOIN [dbo].[especies] AS [Extent4] ON [Extent3].[Id_especie] = [Extent4].[Id]" +
                        "WHERE([Extent1].[Nombre] LIKE '%"+buscar+ "%') or ([Extent1].[Descripcion] LIKE '%" + buscar + "%' ) " +                        
                        "or([Extent2].[Nombre] LIKE '%" + buscar + "%' ) or ([Extent2].[Descripcion] LIKE '%" + buscar + "%' )"+
                        "or([Extent3].[Nombre] LIKE '%" + buscar + "%' ) or ([Extent3].[Descripcion] LIKE '%" + buscar + "%' )" +
                        "or([Extent4].[Tipo] LIKE '%" + buscar + "%' )or ([Extent4].[Nombre] LIKE '%" + buscar + "%' ) or([Extent4].[Descripcion] LIKE '%" + buscar + "%' )"
                        +where);
            ViewBag.Lst_productos = lst_productos.ToList();
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