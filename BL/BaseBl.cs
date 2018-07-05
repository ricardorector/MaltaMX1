namespace BL
{
    using BL.Utils;
    using DTO;
    using System.IO;

    public abstract class BaseBl
    {
        #region Properties

        public string Message { get; set; }

        public bool IsCorrect { get; set; }

        #endregion

        #region Members

        protected string TemplatesPath = string.Empty;

        #endregion

        #region Builder

        public BaseBl()
        {
            this.TemplatesPath = System.Web.HttpContext.Current.Server.MapPath("~/Content/template/");
        }

        #endregion

        #region Methods

        #region Protected

        protected string GetMailTemplate(string AppSetName)
        {
            var path = this.TemplatesPath + this.AppSet(AppSetName);

            return File.ReadAllText(path, System.Text.Encoding.UTF8);
        }

        protected Token GetToken(string ApiToken)
        {
            var token = new Token
            {
                Message = "Ejecución correcta",
                IsCorrect = true
            };

            if (!string.IsNullOrEmpty(ApiToken))
            {
                var apiToken = new ApiToken();

                var values = apiToken.CheckApiToken(ApiToken);

                if (apiToken.IsCorrect)
                {
                    var elements = values.Split('|');

                    if (elements.Length.Equals(3))
                    {
                        token.IdUser = int.Parse(elements[0].ToString());
                        token.IdPlant = int.Parse(elements[2].ToString());
                    }
                    else
                    {
                        token.Message = "Token incorrecto [TKN101]";
                        token.IsCorrect = false;
                    }
                }
                else
                {
                    token.Message = apiToken.ErrorMessage;
                    token.IsCorrect = false;
                }
            }
            else
            {
                token.Message = "Token incorrecto [TKN100]";
                token.IsCorrect = false;
            }

            return token;
        }

        protected void SendMail(string To, string Subject, string Body, string BCC = "", string CC = "", MemoryStream Attachment = null, string AttachmentName = "", string AttachmentMediaType = "")
        {
            var from = this.AppSet("Mail-From");

            var port = this.AppSet<int>("Mail-Port");
            var host = this.AppSet("Mail-Host");
            var user = this.AppSet("Mail-Credentials-User");
            var password = this.AppSet("Mail-Credentials-Password");

            var mail = new MaltaMail(To, from, Subject, Body, user, password, host, port)
            {
                CC = CC,
                BCC = BCC,
            };

            if (Attachment != null && !string.IsNullOrEmpty(AttachmentName) && !string.IsNullOrEmpty(AttachmentMediaType))
            {
                mail.Attachment = Attachment;
                mail.AttachmentName = AttachmentName;
                mail.AttachmentMediaType = AttachmentMediaType;
            }

            mail.Send();
        }

        #endregion

        #endregion
    }
}