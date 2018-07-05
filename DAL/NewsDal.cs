namespace DAL
{
    using DTO;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.SqlClient;
    using System.Linq;

    public class NewsDal : BaseDal
    {
        #region Methods

        public Slider Slider(int index)
        {
            var list = new List<Slider>();

            using (var con = new SqlConnection(this.ConnectionStrings))
            {
                using (var cmd = new SqlCommand("slider", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@Page", SqlDbType.Int);
                    cmd.Parameters["@Page"].Value = index;

                    con.Open();

                    using (var r = cmd.ExecuteReader())
                    {
                        while (r.Read())
                        {
                            list.Add(new Slider
                            {
                                Id = int.Parse(r["Id"].ToString()),
                                Titulo = r["Titulo"].ToString(),
                                Descripcion = r["Descripcion"].ToString(),
                                Etiquetas = r["Etiquetas"].ToString(),
                                Tipo = r["Id"].ToString(),
                                Imagen = r["Imagen"].ToString(),
                                Autor = r["Autor"].ToString(),
                                Especies = r["Especies"].ToString(),
                                Pages = int.Parse(r["Pages"].ToString())
                            });
                        }
                    }
                }
            }

            if (list.Any())
                return list.First();
            else
                return new DTO.Slider();
        }

        #endregion
    }
}