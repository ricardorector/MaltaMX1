namespace DAL
{
    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public abstract class BaseDal
    {
        #region Members

        protected string ConnectionStrings = ConfigurationManager.ConnectionStrings["ado"].ToString();

        #endregion
    }
}
