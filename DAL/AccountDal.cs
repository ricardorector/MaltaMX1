namespace DAL
{
    using DTO;
    using System.Data;
    using System.Data.SqlClient;

    public class AccountDal : BaseDal
    {
        #region Methods

        public UserData GetUserInfo(Token Token)
        {
            using (SqlConnection con = new SqlConnection(this.ConnectionStrings))
            {
                using (SqlCommand cmd = new SqlCommand("DatosUsuario", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@id", SqlDbType.Int);
                    cmd.Parameters["@id"].Value = Token.IdUser;

                    con.Open();

                    using (var ada = new SqlDataAdapter(cmd))
                    {
                        using (var dt = new DataTable())
                        {
                            ada.Fill(dt);

                            if (dt.Rows.Count > 0)
                            {
                                return new UserData
                                {
                                    Name = dt.Rows[0]["Nombre"].ToString(),
                                    Phone = dt.Rows[0]["Telefono"].ToString(),
                                    CellPhone = dt.Rows[0]["Celular"].ToString(),
                                    Email = dt.Rows[0]["Mail"].ToString(),
                                    PlantName = dt.Rows[0]["planta"].ToString(),
                                    Discount = float.Parse(dt.Rows[0]["Descuento"].ToString()),
                                };
                            }
                            else
                                return null;
                        }
                    }
                }
            }
        }

        public string Login(string User, string Password, out bool FirstPassword)
        {
            using (SqlConnection con = new SqlConnection(this.ConnectionStrings))
            {
                using (SqlCommand cmd = new SqlCommand("login", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@usuario", SqlDbType.VarChar, 100);
                    cmd.Parameters["@usuario"].Value = User;

                    cmd.Parameters.Add("@contrasenia", SqlDbType.VarChar, 100);
                    cmd.Parameters["@contrasenia"].Value = Password;

                    con.Open();

                    using (var ada = new SqlDataAdapter(cmd))
                    {
                        using (var dt = new DataTable())
                        {
                            ada.Fill(dt);

                            if (dt.Rows.Count > 0)
                            {
                                FirstPassword = bool.Parse(dt.Rows[0]["PrimeraContrasenia"].ToString());

                                return dt.Rows[0]["Id"].ToString() + "|" +
                                       dt.Rows[0]["IdDIstribuidor"].ToString() + "|" +
                                       dt.Rows[0]["IdPlanta"].ToString();
                            }
                            else
                            {
                                FirstPassword = false;

                                return string.Empty;
                            }
                        }
                    }
                }
            }
        }

        public string SendRecoverPassword(string User)
        {
            using (SqlConnection con = new SqlConnection(this.ConnectionStrings))
            {
                using (SqlCommand cmd = new SqlCommand("ValidarMail", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@email", SqlDbType.VarChar, 50);
                    cmd.Parameters["@email"].Value = User;

                    con.Open();

                    var result = cmd.ExecuteScalar();

                    if (result != null)
                        return cmd.ExecuteScalar().ToString();
                    else
                        return string.Empty;
                }
            }
        }

        public int SaveGuid(string User, string Guid)
        {
            using (SqlConnection con = new SqlConnection(this.ConnectionStrings))
            {
                using (SqlCommand cmd = new SqlCommand("GuardarGuid", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@usuario", SqlDbType.VarChar, 50);
                    cmd.Parameters["@usuario"].Value = User;

                    cmd.Parameters.Add("@Guid", SqlDbType.VarChar, 50);
                    cmd.Parameters["@Guid"].Value = Guid;

                    con.Open();

                    return cmd.ExecuteNonQuery();
                }
            }
        }

        public int ChangePasswordMail(string User, string Contrasenia, string Guid)
        {
            using (SqlConnection con = new SqlConnection(this.ConnectionStrings))
            {
                using (SqlCommand cmd = new SqlCommand("ActualizarContraseniaMail", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@email", SqlDbType.VarChar, 50);
                    cmd.Parameters["@email"].Value = User;

                    cmd.Parameters.Add("@contrasenia", SqlDbType.VarChar, 50);
                    cmd.Parameters["@contrasenia"].Value = Contrasenia;

                    cmd.Parameters.Add("@Guid", SqlDbType.VarChar, 50);
                    cmd.Parameters["@Guid"].Value = Guid;

                    con.Open();

                    return cmd.ExecuteNonQuery();
                }
            }
        }

        public bool ChangePassword(string Password, Token Token)
        {
            using (SqlConnection con = new SqlConnection(this.ConnectionStrings))
            {
                using (SqlCommand cmd = new SqlCommand("ActualizarContrasenia", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@Id", SqlDbType.Int);
                    cmd.Parameters["@Id"].Value = Token.IdUser;

                    cmd.Parameters.Add("@contrasenia", SqlDbType.VarChar, 50);
                    cmd.Parameters["@contrasenia"].Value = Password;

                    con.Open();

                    return cmd.ExecuteNonQuery().Equals(1);
                }
            }
        }

        #endregion
    }
}
