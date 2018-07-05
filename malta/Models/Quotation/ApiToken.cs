using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.NetworkInformation;
using System.Security.Cryptography;
using System.Web;
using malta.Models.Quotation.Utils;
using System.Net;

namespace malta.Models.Quotation
{
    /// <summary>
    /// Gestiona la funcionalidad de los ApiToken's.
    /// </summary>
    [Serializable]
    public class ApiToken
    {
        #region Members

        /// <summary>
        /// Clave usada para encriptar y desencriptar con MD5.
        /// </summary>
        private string KeyMd5;

        /// <summary>
        /// Numero de horas maximas entre comprobacion de ApiToken.
        /// </summary>
        private int Hours;

        /// <summary>
        /// Llave privada usada en encriptacion RSA.
        /// </summary>
        private string PrivateKeyRSA = "<RSAKeyValue><Modulus>pg1bmbzAmrw25SDfNncNQ/jrD+QfkwcL028DBL682or9VgsMMTldSkyUpFDp8DuTVeIWiY99rxeFqZYrOlwLvu48O3d0Kt9f27K6NmSGZHSWRDLiL/Wvqn94SGnCzE/OFU2RbhaliBoeSyU/yK8HDBKSvXWoXk5c45aTRih2WwE=</Modulus><Exponent>AQAB</Exponent><P>6UwzRlsxdmY08/GTw3+WFCysWxygJLIPO1fJKEa1WogkOM9bvbY5z8KdX4C4BypaqdCiCRrGXpCVkpPeQ7VAJQ==</P><Q>tjX4ZlyGhF7HV3TrQKzL3JHIWrD0zZS0wDP7SUPZ3hCk6qpl7ucNsnCw1EAHrjubBhOFTf5ZXyubzB3lHqlarQ==</Q><DP>FkCRZ3WNSzjGdjolmPETdIsqSWp6j+V39HYUFsZfx+nSYqTMoFTAQOPUNObHJs/QZAAlZG7sWtq5mYiHG7gvDQ==</DP><DQ>STw2A8ZqlqeVjZRDvfH12kiJ89GuAzci0yHRfSgVWEjuUBd+8t/RRIhAun6l16TDcVTFPozdlP/tFcRqQ8Gj3Q==</DQ><InverseQ>sEJ6Pw+3l7exyjawGb5a4xGR/pQIKFiOonaEijHRmVGz3ocCU5X7YUkyDrxXLYXZ4qnF9187K67n2Z2b0QiU/g==</InverseQ><D>XXgDacRfvjnXxJ3+R1A4PVyuJCHKzB4ZQAiq8E7VS0cVVwuc71BU/O+ic+O/6yP9yUgcW45Ttu1MpasL5ivNx9+6yAzciue3ba1h6ETqJaRFJFxJ7v+6WpdD2P0t2uVncNn4vWpp/sIE2iCt20V4sXsWvxWwmA0dB3SBEfWjhOE=</D></RSAKeyValue>";

        /// <summary>
        /// Llave publica usada en encriptacion RSA.
        /// </summary>
        private string PublicKeyRSA = "<RSAKeyValue><Modulus>pg1bmbzAmrw25SDfNncNQ/jrD+QfkwcL028DBL682or9VgsMMTldSkyUpFDp8DuTVeIWiY99rxeFqZYrOlwLvu48O3d0Kt9f27K6NmSGZHSWRDLiL/Wvqn94SGnCzE/OFU2RbhaliBoeSyU/yK8HDBKSvXWoXk5c45aTRih2WwE=</Modulus><Exponent>AQAB</Exponent></RSAKeyValue>";

        /// <summary>
        /// Nombre del navegador usado por el cliente.
        /// </summary>
        private string Browser;

        /// <summary>
        /// Direccion Ip del cliente.
        /// </summary>
        private string Ip;

        /// <summary>
        /// Version del navegador usado por el cliente.
        /// </summary>
        private string BrowserVersion;

        #endregion

        #region Properties

        /// <summary>
        /// Obtiene los mensages de error.
        /// </summary>
        public string ErrorMessage { get; private set; }

        public bool IsCorrect { get; private set; }

        #endregion

        #region Builder

        /// <summary>
        /// Constructor default.
        /// </summary>
        public ApiToken()
        {
            this.PrivateKeyRSA = "<RSAKeyValue><Modulus>pg1bmbzAmrw25SDfNncNQ/jrD+QfkwcL028DBL682or9VgsMMTldSkyUpFDp8DuTVeIWiY99rxeFqZYrOlwLvu48O3d0Kt9f27K6NmSGZHSWRDLiL/Wvqn94SGnCzE/OFU2RbhaliBoeSyU/yK8HDBKSvXWoXk5c45aTRih2WwE=</Modulus><Exponent>AQAB</Exponent><P>6UwzRlsxdmY08/GTw3+WFCysWxygJLIPO1fJKEa1WogkOM9bvbY5z8KdX4C4BypaqdCiCRrGXpCVkpPeQ7VAJQ==</P><Q>tjX4ZlyGhF7HV3TrQKzL3JHIWrD0zZS0wDP7SUPZ3hCk6qpl7ucNsnCw1EAHrjubBhOFTf5ZXyubzB3lHqlarQ==</Q><DP>FkCRZ3WNSzjGdjolmPETdIsqSWp6j+V39HYUFsZfx+nSYqTMoFTAQOPUNObHJs/QZAAlZG7sWtq5mYiHG7gvDQ==</DP><DQ>STw2A8ZqlqeVjZRDvfH12kiJ89GuAzci0yHRfSgVWEjuUBd+8t/RRIhAun6l16TDcVTFPozdlP/tFcRqQ8Gj3Q==</DQ><InverseQ>sEJ6Pw+3l7exyjawGb5a4xGR/pQIKFiOonaEijHRmVGz3ocCU5X7YUkyDrxXLYXZ4qnF9187K67n2Z2b0QiU/g==</InverseQ><D>XXgDacRfvjnXxJ3+R1A4PVyuJCHKzB4ZQAiq8E7VS0cVVwuc71BU/O+ic+O/6yP9yUgcW45Ttu1MpasL5ivNx9+6yAzciue3ba1h6ETqJaRFJFxJ7v+6WpdD2P0t2uVncNn4vWpp/sIE2iCt20V4sXsWvxWwmA0dB3SBEfWjhOE=</D></RSAKeyValue>";
            this.PublicKeyRSA = "<RSAKeyValue><Modulus>pg1bmbzAmrw25SDfNncNQ/jrD+QfkwcL028DBL682or9VgsMMTldSkyUpFDp8DuTVeIWiY99rxeFqZYrOlwLvu48O3d0Kt9f27K6NmSGZHSWRDLiL/Wvqn94SGnCzE/OFU2RbhaliBoeSyU/yK8HDBKSvXWoXk5c45aTRih2WwE=</Modulus><Exponent>AQAB</Exponent></RSAKeyValue>";

            this.KeyMd5 = "Created by:Alo-DACO";
            this.Hours = 2;

            var request = HttpContext.Current.Request;

            this.Browser = request.GetBrowserName();
            this.Ip = request.UserHostAddress;
            this.BrowserVersion = request.GetBrowserVersion();

            request = null;

            //Genera las claes
            //string pub, priv;
            //CreateKeys(out pub, out priv);
        }

        #endregion

        #region Methods

        /// <summary>
        /// Crea un ApiToken de seguridad.
        /// </summary>
        /// <param name="Text">Elemento identificador del ApiToken.</param>
        /// <returns>ApiToken</returns>
        public string CreateApiToken(string Text)
        {
            string apiToken = this.GetToken(Text);

            apiToken = apiToken.EncryptPublicKey(this.PublicKeyRSA);
            apiToken = apiToken.EncryptMd5(this.KeyMd5);
            apiToken = apiToken.Reverse();
            apiToken = Extensions.GetRef(0, 12, true) + apiToken;
            apiToken = apiToken.Replace("=", "__");

            return apiToken;
        }

        /// <summary>
        /// Verifica si el ApiToken es valido.
        /// </summary>
        /// <param name="ApiToken">ApiToken actual.</param>
        /// <returns>Indica si el ApiToken es valido.</returns>
        public string CheckApiToken(string ApiToken)
        {
            string value, apiToken2;
             this.IsCorrect = true;

            ApiToken = ApiToken.Replace("__", "=");
            ApiToken = ApiToken.Substring(12);
            ApiToken = ApiToken.Reverse();
            ApiToken = ApiToken.DecryptMd5(this.KeyMd5);
            ApiToken = ApiToken.DecryptPublicKey(this.PrivateKeyRSA);

            var elements = ApiToken.Split(new string[] { "_-_" }, StringSplitOptions.None);

            if (elements.Length > 0)
            {
                value = elements[elements.Length - 1];

                apiToken2 = this.GetToken(value);

                string[] elements2 = apiToken2.Split(new string[] { "_-_" }, StringSplitOptions.None);

                for (int i = 0; i < elements.Length; i++)
                {
                    this.IsCorrect &= elements[i].Equals(elements2[i]);
                }

                if (this.IsCorrect)
                    return elements[elements.Length - 1];
                else
                    return "Token incorrecto [TKN201]";
            }
            else
            {
                this.ErrorMessage += "Token incorrecto [TKN200]";

                return string.Empty;
            }
        }

        /// <summary>
        /// Obtiene la cadena que se usa como ApiToken.
        /// </summary>
        /// <param name="Text">Elemento identificador del ApiToken.</param>
        /// <returns>ApiToken.</returns>
        private string GetToken(string Text)
        {
            string browser = string.Empty;

            switch (this.Browser)
            {
                case "InternetExplorer":
                    browser = "ie";
                    break;
                case "Chrome":
                    browser = "ch";
                    break;
                case "Firefox":
                    browser = "ff";
                    break;
                case "Opera":
                    browser = "op";
                    break;
                default:
                    browser = "ot";
                    break;
            }

            string apiToken = this.Ip + "_-_" +
                              this.Browser + "_-_" +
                              Text;

            return apiToken;
        }

        /// <summary>
        /// Genera la clave publica y la clave privada.
        /// </summary>
        /// <param name="Pub">Indica donde se devuelve la clave publica.</param>
        /// <param name="Priv">Indica donde se devuelve la clave privada.</param>
        private void CreateKeys(out string Pub, out string Priv)
        {
            var rsa = new RSACryptoServiceProvider();
            var privateParameters = rsa.ExportParameters(true);
            var publicParameters = rsa.ExportParameters(false);

            Pub = rsa.ToXmlString(true);

            Priv = rsa.ToXmlString(false);
        }

        #endregion
    }
}
