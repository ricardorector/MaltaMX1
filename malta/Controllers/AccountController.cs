namespace malta.Controllers
{
    using System.Web.Mvc;
    using BL;

    public class AccountController : Controller
    {
        #region Members

        private AccountBl Bl;

        #endregion

        #region Builder

        public AccountController()
        {
            this.Bl = new AccountBl();
        }

        #endregion

        #region Methods

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult Login(string usuario, string contrasenia)
        {
            bool FirstPassword = false;
            var token = this.Bl.Login(usuario, contrasenia, out FirstPassword);

            return Json(new
            {
                correcto = this.Bl.IsCorrect,
                token,
                href = FirstPassword ? "ChangePassword.html" : "Quotation.html"
            },
            JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult SendRecoverPassword(string usuario)
        {
            this.Bl.SendRecoverPassword(usuario);

            return Json(new
            {
                isCorrect = this.Bl.IsCorrect,
                message = this.Bl.Message
            },
            JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ChangePasswordMail(string Contrasenia, string Contrasenia2, string Value)
        {
            this.Bl.ChangePasswordMail(Contrasenia, Contrasenia2, Value);

            return Json(new
            {
                isCorrect = this.Bl.IsCorrect,
                message = this.Bl.Message
            },
            JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ChangePassword(string Contrasenia, string Contrasenia2, string Token)
        {
            this.Bl.ChangePassword(Contrasenia, Contrasenia2, Token);

            return Json(new
            {
                isCorrect = this.Bl.IsCorrect,
                message = this.Bl.Message
            },
            JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetUserInfo(string Token)
        {
            var data = this.Bl.GetUserInfo(Token);

            return Json(new
            {
                data,
                isCorrect = this.Bl.IsCorrect,
                message = this.Bl.Message
            },
            JsonRequestBehavior.AllowGet);
        }

        #endregion
    }
}