namespace malta.Controllers
{
    using System.Web.Mvc;
    using BL;
    using System.Collections.Generic;
    using DTO;

    public class FacadeController : Controller
    {
        #region Members

        private AccountBl Account;

        private QuotationBl Quotation;

        #endregion

        #region Builder

        public FacadeController()
        {
            this.Account = new AccountBl();
            this.Quotation = new QuotationBl();
        }

        #endregion

        #region Methods

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetDataForQuotation(string Token)
        {
            var isCorrect = true;
            var message = string.Empty;

            var products = this.Quotation.GetProducts(Token);
            isCorrect &= this.Quotation.IsCorrect;
            message = this.Quotation.Message;

            var trucks = this.Quotation.GetTruck(Token);
            isCorrect &= this.Quotation.IsCorrect;
            message = message + "  -  " + this.Quotation.Message;

            var account = this.Account.GetUserInfo(Token);
            isCorrect &= this.Account.IsCorrect;
            message = message + "  -  " + this.Account.Message;

            return Json(new
            {
                products,
                trucks,
                plantName = account.PlantName,
                userName = account.Name,
                discount = account.Discount,
                isCorrect,
                message
            },
            JsonRequestBehavior.AllowGet);
        }

        #endregion
    }
}