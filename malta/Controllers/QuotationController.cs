namespace malta.Controllers
{
    using System.Web.Mvc;
    using BL;
    using System.Collections.Generic;
    using DTO;

    public class QuotationController : Controller
    {
        #region Members

        private QuotationBl Bl;

        #endregion

        #region Builder

        public QuotationController()
        {
            this.Bl = new QuotationBl();
        }

        #endregion

        #region Methods

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetProducts(string Token)
        {
            var list = this.Bl.GetProducts(Token);

            return Json(new
            {
                list,
                isCorrect = this.Bl.IsCorrect,
                message = this.Bl.Message
            },
            JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetTruncks(string Token)
        {
            var list = this.Bl.GetTruck(Token);

            return Json(new
            {
                list,
                isCorrect = this.Bl.IsCorrect,
                message = this.Bl.Message
            },
            JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult SaveQ(string Token, int IdTruck, int IdDayOfWeek, List<RequestProducts> Products)
        {
            int idQ = this.Bl.SaveQ(Token, IdTruck, IdDayOfWeek, Products);

            return Json(new
            {
                idQ,
                isCorrect = this.Bl.IsCorrect,
                message = this.Bl.Message
            },
            JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SendQ(string Token, UserData Data)
        {
            this.Bl.SendQ(Token, Data);

            return Json(new
            {
                isCorrect = this.Bl.IsCorrect,
                message = this.Bl.Message
            },
            JsonRequestBehavior.AllowGet);
        }

        #endregion
    }
}