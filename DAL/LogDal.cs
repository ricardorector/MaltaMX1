namespace DAL
{
    using DTO;
    using System.Data;
    using System.Data.SqlClient;

    public class LogDal : BaseDal
    {
        #region Methods

        public int SaveVisit(ResponseGeo Visits)
        {
            using (SqlConnection con = new SqlConnection(this.ConnectionStrings))
            {
                using (SqlCommand cmd = new SqlCommand("GuardarVisitas", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@ip", SqlDbType.VarChar, 15);
                    cmd.Parameters["@ip"].Value = Visits.geoplugin_request;

                    cmd.Parameters.Add("@pais", SqlDbType.VarChar, 50);
                    cmd.Parameters["@pais"].Value = Visits.geoplugin_countryName;

                    cmd.Parameters.Add("@estado", SqlDbType.VarChar, 50);
                    cmd.Parameters["@estado"].Value = Visits.geoplugin_regionName;

                    cmd.Parameters.Add("@latitude", SqlDbType.VarChar, 50);
                    cmd.Parameters["@latitude"].Value = Visits.geoplugin_latitude;

                    cmd.Parameters.Add("@longitude", SqlDbType.VarChar, 50);
                    cmd.Parameters["@longitude"].Value = Visits.geoplugin_longitude;

                    con.Open();

                    return int.Parse(cmd.ExecuteScalar().ToString());
                }
            }
        }

        #endregion
    }
}
