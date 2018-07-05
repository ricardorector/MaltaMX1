namespace BL
{
    using BL.Utils;
    using DAL;
    using DTO;
    using System;
    using System.Web;

    /// <summary>
    /// Getiona los logs de la app
    /// </summary>
    public class AccountBl : BaseBl
    {
        #region Members

        private AccountDal dal;

        private string Key = string.Empty;

        #endregion

        #region Builder

        public AccountBl()
        {
            this.dal = new AccountDal();
            this.Key = this.AppSet("Recover-Password-MD5");
        }

        #endregion

        #region Methods

        #region PUblic

        public string Login(string usuario, string contrasenia, out bool FirstPassword)
        {
            this.IsCorrect = false;
            FirstPassword = false;

            var token = "Usuario o contraseña incorrecta";

            try
            {
                var result = this.dal.Login(usuario, contrasenia, out FirstPassword);

                if (!string.IsNullOrEmpty(result))
                {
                    var apiToken = new ApiToken();

                    token = apiToken.CreateApiToken(result);

                    IsCorrect = true;
                }
            }
            catch (Exception ex)
            {
                token = ex.Message;
            }

            return token;
        }

        public void SendRecoverPassword(string User)
        {
            this.IsCorrect = false;
            this.Message = "Se envió un correo electronico a su dirección registrada, siga las instrucciones para acceder nuevamente a su cuenta";

            try
            {
                User = User.Trim();

                var email = this.dal.SendRecoverPassword(User).Trim();

                if (!string.IsNullOrEmpty(User))
                {
                    if (email.Equals(User, StringComparison.InvariantCultureIgnoreCase))
                    {
                        var guid = Guid.NewGuid().ToString();

                        if (this.dal.SaveGuid(User, guid).Equals(1))
                        {
                            this.SendMailQ(email, guid);

                            this.IsCorrect = true;
                        }
                        else
                        {
                            this.Message = "Error al generar el identificador";
                        }
                    }
                    else
                    {
                        this.Message = "La dirección de correo electrónico indicado no se encuentra registrada";
                    }
                }
                else
                {
                    this.Message = "Indique el nombre de usuario";
                }
            }
            catch (Exception ex)
            {
                this.Message = ex.Message;
            }
        }

        private void SendMailQ(string To, string Guid)
        {
            var values = (To + "|" + Guid).EncryptMd5(this.Key);

            var url = "http://" + HttpContext.Current.Request.Url.Authority + "/Quotation/ChangePasswordMail.html?r=" + HttpUtility.UrlEncode(values);

            var subject = this.AppSet("Mail-Subject-Recover-Password");
            var body = this.GetMailTemplate("Mail-Template-Recover-Password");

            body = body.Replace("#URL#", url);

            SendMail(To, subject, body);
        }

        public UserData GetUserInfo(string Token)
        {
            var data = new UserData();

            this.IsCorrect = false;
            this.Message = "Información obtenida exitosamente";

            try
            {
                var token = this.GetToken(Token);

                this.Message = token.Message;
                this.IsCorrect = token.IsCorrect;

                if (this.IsCorrect)
                {
                    data = this.dal.GetUserInfo(token);
                    this.IsCorrect = true;
                }
            }
            catch (Exception ex)
            {
                this.Message = ex.Message;
            }

            return data;
        }

        public void ChangePasswordMail(string Password, string Password2, string Value)
        {
            this.IsCorrect = false;
            this.Message = "La contraseña se cambio correctamente";

            try
            {
                if (!string.IsNullOrEmpty(Password))
                {
                    if (Password.Equals(Password2))
                    {
                        if (Password.Length >= 6)
                        {
                            if (!string.IsNullOrEmpty(Value))
                            {
                                var key = HttpUtility.UrlDecode(Value);
                                var values = key.DecryptMd5(this.Key).Split('|');

                                if (values.Length.Equals(2))
                                {
                                    if (this.dal.ChangePasswordMail(values[0], Password, values[1]).Equals(1))
                                    {
                                        this.IsCorrect = true;
                                    }
                                    else
                                    {
                                        this.Message = "No se pudo actualizar la contraseña, genera una nueva solicitud";
                                    }
                                }
                                else
                                {
                                    this.Message = "La llave es incorrecta";
                                }
                            }
                            else
                            {
                                this.Message = "No se encontró la llave";
                            }
                        }
                        else
                        {
                            this.Message = "La contraseña debe tener al menos 6 caracteres";
                        }
                    }
                    else
                    {
                        this.Message = "Las contraseñas no coinciden";
                    }
                }
                else
                {
                    this.Message = "Las contraseñas no pueden estar vacias";
                }
            }
            catch (Exception ex)
            {
                this.Message = ex.Message;
            }
        }

        public void ChangePassword(string Password, string Password2, string Token)
        {
            this.IsCorrect = false;

            try
            {
                var token = this.GetToken(Token);

                this.Message = token.Message;
                this.IsCorrect = token.IsCorrect;

                if (this.IsCorrect)
                {
                    if (!string.IsNullOrEmpty(Password))
                    {
                        if (Password.Equals(Password2))
                        {
                            if (Password.Length >= 6)
                            {
                                if (this.dal.ChangePassword(Password, token))
                                {
                                    this.Message = "La contraseña se cambio correctamente";
                                    this.IsCorrect = true;
                                }
                                else
                                {
                                    this.Message = "No se pudo actualizar la contraseña, genera una nueva solicitud";
                                }
                            }
                            else
                            {
                                this.Message = "La contraseña debe tener al menos 6 caracteres";
                            }
                        }
                        else
                        {
                            this.Message = "Las contraseñas no coinciden";
                        }
                    }
                    else
                    {
                        this.Message = "Las contraseñas no pueden estar vacias";
                    }
                }
            }
            catch (Exception ex)
            {
                this.Message = ex.Message;
            }
        }

        #endregion

        #endregion
    }
}
