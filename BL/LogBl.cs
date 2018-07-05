namespace BL
{
    using DAL;
    using DTO;
    using System;
    using System.Net;
    using System.Text;
    using System.Web.Script.Serialization;

    /// <summary>
    /// Getiona los logs de la app
    /// </summary>
    public class LogBl : BaseBl
    {
        #region Members

        private LogDal dal;

        #endregion

        #region Builder

        public LogBl()
        {
            this.dal = new LogDal();
        }

        #endregion

        #region Methods

        #region PUblic

        public int SaveVisit(string Ip)
        {
            var client = new WebClient();
            var stringJSON = client.DownloadString("http://www.geoplugin.net/json.gp?ip=" + Ip);

            var infoJSON = new JavaScriptSerializer();
            var visit = infoJSON.Deserialize<ResponseGeo>(stringJSON);

            visit.geoplugin_countryName = System.Net.WebUtility.HtmlDecode(visit.geoplugin_countryName);
            visit.geoplugin_regionName = System.Net.WebUtility.HtmlDecode(visit.geoplugin_regionName);

            this.IsCorrect = false;
            this.Message = "Información guardada exitosamente";

            try
            {
                var reult = this.dal.SaveVisit(visit);

                if (reult == 1 || reult == 2)
                    this.IsCorrect = true;
                else
                    this.Message = "La información no se guardo";

                return reult;
            }
            catch (Exception ex)
            {
                this.Message = ex.Message;
                return 0;
            }
        }

        #endregion

        #endregion
    }
}
