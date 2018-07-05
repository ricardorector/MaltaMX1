namespace malta.Controllers
{
    using System.Web.Mvc;
    using BL;
    using System.Collections.Generic;
    using DTO;

    public class LogController : Controller
    {
        #region Members

        private LogBl Bl;

        #endregion

        #region Builder

        public LogController()
        {
            this.Bl = new LogBl();
        }

        #endregion

        #region Methods

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult SaveVisit(string Ip)
        {
            var result = this.Bl.SaveVisit(Ip);

            return Json(new
            {
                result,
                isCorrect = this.Bl.IsCorrect,
                message = this.Bl.Message
            },
            JsonRequestBehavior.AllowGet);
        } 

        #endregion
    }
}