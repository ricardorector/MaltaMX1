namespace BL.Utils
{
    using System;
    using System.Configuration;
    using System.Security.Cryptography;
    using System.Text;
    using System.Web;

    public static class Extensions
    {
        #region Methods

        /// <summary>
        /// Obtiene el valor del AppSetting indicado de la aplicacion actual.
        /// </summary>
        /// <param name="pg">Objeto.</param>
        /// <param name="SettingName">Nombre del AppSetting.</param>
        /// <returns></returns>
        public static T AppSet<T>(this Object obj, String SettingName)
        {
            if (ConfigurationManager.AppSettings[SettingName] != null)
                return (T)Convert.ChangeType(ConfigurationManager.AppSettings[SettingName], typeof(T));
            else
                return default(T);
        }

        /// <summary>
        /// Obtiene el valor del AppSetting indicado de la aplicacion actual.
        /// </summary>
        /// <param name="pg">Objeto.</param>
        /// <param name="SettingName">Nombre del AppSetting.</param>
        /// <returns></returns>
        public static string AppSet(this Object obj, String SettingName)
        {
            if (ConfigurationManager.AppSettings[SettingName] != null)
                return ConfigurationManager.AppSettings[SettingName].ToString();
            else
                return string.Empty;
        }

        /// <summary>
        /// Obtiene la ip del cliente.
        /// </summary>
        /// <param name="Request">Objeto HttpRequest que representa la solicitud HTTP actual.</param>
        /// <returns>Direccion Ip.</returns>
        public static string GetIp(this HttpRequest Request)
        {
            var ipAddress1 = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            var ipAddress2 = Request.ServerVariables["REMOTE_ADDR"];

            return string.IsNullOrEmpty(ipAddress1) ? ipAddress2 : ipAddress1;
        }

        /// <summary>
        /// Obtiene el nombre del navegador del cliente.
        /// </summary>
        /// <param name="Request">Objeto HttpRequest que representa la solicitud HTTP actual.</param>
        /// <returns>Nombre del navegador del cliente.</returns>
        public static string GetBrowserName(this HttpRequest Request)
        {
            return Request.Browser.Browser;

        }

        /// <summary>
        /// Obtiene la version del navegador del cliente.
        /// </summary>
        /// <param name="Request">Objeto HttpRequest que representa la solicitud HTTP actual.</param>
        /// <returns>Nombre del navegador del cliente.</returns>
        public static string GetBrowserVersion(this HttpRequest Request)
        {
            return Request.Browser.Version;
        }

        public static string DecryptPublicKey(this string Text, string PrivateKey)
        {
            var rsa = new RSACryptoServiceProvider();
            var dataArray = Text.Split(new char[] { ',' });
            byte[] dataByte = new byte[dataArray.Length];
            for (int i = 0; i < dataArray.Length; i++)
            {
                dataByte[i] = Convert.ToByte(dataArray[i]);
            }

            rsa.FromXmlString(PrivateKey);
            var decryptedByte = rsa.Decrypt(dataByte, false);
            return Encoding.ASCII.GetString(decryptedByte);
        }

        public static string EncryptPublicKey(this string Text, string PublicKey)
        {
            var rsa = new RSACryptoServiceProvider();
            rsa.FromXmlString(PublicKey);
            var dataToEncrypt = Encoding.ASCII.GetBytes(Text);
            var encryptedByteArray = rsa.Encrypt(dataToEncrypt, false);
            var length = encryptedByteArray.Length;
            var item = 0;
            var sb = new StringBuilder();
            foreach (var x in encryptedByteArray)
            {
                item++;
                sb.Append(x);

                if (item < length)
                    sb.Append(",");
            }

            return sb.ToString();
        }

        public static string Reverse(this string Text)
        {
            var arr = Text.ToCharArray();
            Array.Reverse(arr);
            return new string(arr);
        }

        /// <summary>
        /// Encripta una cadena.
        /// </summary>
        /// <param name="cadena">Cadena a Encriptar.</param>
        /// <param name="Key">Llave.</param>
        /// <returns>Cadena Encriptada.</returns>
        public static String EncryptMd5(this String cadena, String Key)
        {
            //arreglo de bytes donde guardaremos la llave
            byte[] keyArray;
            //arreglo de bytes donde guardaremos el texto
            //que vamos a encriptar
            byte[] Arreglo_a_Cifrar =
            System.Text.UTF8Encoding.UTF8.GetBytes(cadena);

            //se utilizan las clases de encriptación
            //provistas por el Framework
            //Algoritmo MD5
            MD5CryptoServiceProvider hashmd5 =
            new MD5CryptoServiceProvider();
            //se guarda la llave para que se le realice
            //hashing
            keyArray = hashmd5.ComputeHash(
            System.Text.UTF8Encoding.UTF8.GetBytes(Key));

            hashmd5.Clear();

            //Algoritmo 3DAS
            TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();

            tdes.Key = keyArray;
            tdes.Mode = CipherMode.ECB;
            tdes.Padding = PaddingMode.PKCS7;

            //se empieza con la transformación de la cadena
            ICryptoTransform cTransform =
            tdes.CreateEncryptor();

            //arreglo de bytes donde se guarda la
            //cadena cifrada
            byte[] ArrayResultado =
            cTransform.TransformFinalBlock(Arreglo_a_Cifrar,
            0, Arreglo_a_Cifrar.Length);

            tdes.Clear();

            //se regresa el resultado en forma de una cadena
            return Convert.ToBase64String(ArrayResultado,
                    0, ArrayResultado.Length);

        }

        /// <summary>
        /// Desencripta una cadena.
        /// </summary>
        /// <param name="cadena">Cadena a desencriptar.</param>
        /// <param name="Key">Llave.</param>
        /// <returns>Cadena desencriptada.</returns>
        public static String DecryptMd5(this String cadena, String Key)
        {
            byte[] keyArray;
            //convierte el texto en una secuencia de bytes
            byte[] Array_a_Descifrar =
            Convert.FromBase64String(cadena);

            //se llama a las clases que tienen los algoritmos
            //de encriptación se le aplica hashing
            //algoritmo MD5
            MD5CryptoServiceProvider hashmd5 =
            new MD5CryptoServiceProvider();

            keyArray = hashmd5.ComputeHash(
            UTF8Encoding.UTF8.GetBytes(Key));

            hashmd5.Clear();

            TripleDESCryptoServiceProvider tdes =
            new TripleDESCryptoServiceProvider();

            tdes.Key = keyArray;
            tdes.Mode = CipherMode.ECB;
            tdes.Padding = PaddingMode.PKCS7;

            ICryptoTransform cTransform =
             tdes.CreateDecryptor();

            byte[] resultArray =
            cTransform.TransformFinalBlock(Array_a_Descifrar,
            0, Array_a_Descifrar.Length);

            tdes.Clear();
            //se regresa en forma de cadena
            return UTF8Encoding.UTF8.GetString(resultArray);
        }

        /// <summary>
        /// Genera una cadena aleatoria.
        /// </summary>
        /// <param name="StartIndex">Posicion de caracter inicial de base cero de una sub cadena en la instancia.</param>
        /// <param name="Length">Numero de caracteres de la subcadena.</param>
        /// <param name="RemoveSpacers">Indica si se deben quitar los guiones medios.</param>
        /// <returns>Cadena aleatoria.</returns>
        public static string GetRef(int? StartIndex = null, int? Length = null, bool RemoveSpacers = false)
        {
            string guid = Guid.NewGuid().ToString();

            if (RemoveSpacers)
                guid = guid.Replace("-", string.Empty);

            if (StartIndex.HasValue && Length.HasValue)
                guid = guid.Substring(StartIndex.Value, Length.Value);
            else if (StartIndex.HasValue)
                guid = guid.Substring(StartIndex.Value);

            return guid;
        }

        #endregion
    }
}