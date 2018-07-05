namespace DAL
{
    using DTO;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.SqlClient;

    public class QuotationDal : BaseDal
    {
        #region Methods

        public List<Product> GetProducts(Token Token)
        {
            var list = new List<Product>();

            using (var con = new SqlConnection(this.ConnectionStrings))
            {
                using (var cmd = new SqlCommand("ListaProductos", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@idUsuario", SqlDbType.Int);
                    cmd.Parameters["@idUsuario"].Value = Token.IdUser;

                    con.Open();

                    using (var r = cmd.ExecuteReader())
                    {
                        while (r.Read())
                        {
                            list.Add(new Product
                            {
                                Id = int.Parse(r["Id"].ToString()),
                                IdPlant = int.Parse(r["IdPlanta"].ToString()),
                                IdProduct = int.Parse(r["IdProducto"].ToString()),
                                Image = r["Imagen"].ToString(),
                                Name = r["Nombre"].ToString(),
                                IdMeasure = int.Parse(r["IdMedida"].ToString()),
                                Measure = r["Medida"].ToString(),
                                Price = float.Parse(r["Precio"].ToString()),
                                Min = float.Parse(r["Minimo"].ToString()),
                                Kg = float.Parse(r["Kilos"].ToString()),
                                HasPromotion = bool.Parse(r["TienePromocion"].ToString()),
                            });
                        }
                    }
                }
            }

            return list;
        }

        public List<Product> GetProductsPromotion(int IdFhather)
        {
            var list = new List<Product>();

            using (var con = new SqlConnection(this.ConnectionStrings))
            {
                using (var cmd = new SqlCommand("ListaProductosPromocion", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@idPadre", SqlDbType.Int);
                    cmd.Parameters["@idPadre"].Value = IdFhather;

                    con.Open();

                    using (var r = cmd.ExecuteReader())
                    {
                        while (r.Read())
                        {
                            list.Add(new Product
                            {
                                Id = int.Parse(r["Id"].ToString()),
                                IdPlant = int.Parse(r["IdPlanta"].ToString()),
                                IdProduct = int.Parse(r["IdProducto"].ToString()),
                                Image = r["Imagen"].ToString(),
                                Name = r["Nombre"].ToString(),
                                IdMeasure = int.Parse(r["IdMedida"].ToString()),
                                Measure = r["Medida"].ToString(),
                                Price = float.Parse(r["Precio"].ToString()),
                                Min = float.Parse(r["Minimo"].ToString()),
                                Kg = float.Parse(r["Kilos"].ToString()),
                                IdFather = int.Parse(r["IdPadre"].ToString()),
                                ValuePromotion = int.Parse(r["ValorPromocion"].ToString()),
                                RewardPromotion = int.Parse(r["RecompensaPromocion"].ToString())
                            });
                        }
                    }
                }
            }

            return list;
        }

        public HeaderQ GetHeaderQ(int Id)
        {
            using (SqlConnection con = new SqlConnection(this.ConnectionStrings))
            {
                using (SqlCommand cmd = new SqlCommand("DatosCotizacion", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@idCotizacion", SqlDbType.VarChar, 100);
                    cmd.Parameters["@idCotizacion"].Value = Id;

                    con.Open();

                    using (var ada = new SqlDataAdapter(cmd))
                    {
                        using (var dt = new DataTable())
                        {
                            ada.Fill(dt);

                            if (dt.Rows.Count > 0)
                            {
                                return new HeaderQ
                                {
                                    Name = dt.Rows[0]["Nombre"].ToString(),
                                    Phone = dt.Rows[0]["Telefono"].ToString(),
                                    CellPhone = dt.Rows[0]["Celular"].ToString(),
                                    Email = dt.Rows[0]["Mail"].ToString(),
                                    Day = dt.Rows[0]["dia"].ToString(),

                                    IdPlant = int.Parse(dt.Rows[0]["IdPlanta"].ToString()),
                                    Plant = dt.Rows[0]["Planta"].ToString(),
                                    AddressPlant = dt.Rows[0]["PlantaDireccion"].ToString(),
                                    PhonePlant = dt.Rows[0]["PlantaTelefono"].ToString(),
                                    CellPhonePlant = (dt.Rows[0]["PlantaDireccion"] == null ?
                                                     string.Empty :
                                                     dt.Rows[0]["PlantaCelular"].ToString())

                                };
                            }
                            else
                                return null;
                        }
                    }
                }
            }
        }

        public List<Product> GetBodyQ(int Id)
        {
            var list = new List<Product>();

            using (var con = new SqlConnection(this.ConnectionStrings))
            {
                using (var cmd = new SqlCommand("ListaProductosCotizacion", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@idCotizacion", SqlDbType.Int);
                    cmd.Parameters["@idCotizacion"].Value = Id;

                    con.Open();

                    using (var r = cmd.ExecuteReader())
                    {
                        while (r.Read())
                        {
                            list.Add(new Product
                            {
                                IdProduct = int.Parse(r["IdProducto"].ToString()),
                                Name = r["Nombre"].ToString(),
                                Kg = float.Parse(r["Kilos"].ToString()),
                                Price = float.Parse(r["Precio"].ToString()),
                                Min = float.Parse(r["Minimo"].ToString()),
                                Quantity = float.Parse(r["Cantidad"].ToString()),
                                TotalKg = float.Parse(r["kgTotal"].ToString()),
                                Total = float.Parse(r["Total"].ToString()),
                            });
                        }
                    }
                }
            }

            return list;
        }

        public List<PlantMail> GetPlantMail(int Id)
        {
            var list = new List<PlantMail>();

            using (var con = new SqlConnection(this.ConnectionStrings))
            {
                using (var cmd = new SqlCommand("CorreosPlanta", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@IdPlanta", SqlDbType.Int);
                    cmd.Parameters["@IdPlanta"].Value = Id;

                    con.Open();

                    using (var r = cmd.ExecuteReader())
                    {
                        while (r.Read())
                        {
                            list.Add(new PlantMail
                            {
                                MarketStall = r["Nombre"].ToString(),
                                Name = r["Nombre"].ToString(),
                                Email = r["Correo"].ToString(),
                                Type = r["Tipo"].ToString(),
                            });
                        }
                    }
                }
            }

            return list;
        }

        public int SaveQ(Token Token, int IdTruck, int IdDayOfWeek)
        {
            using (SqlConnection con = new SqlConnection(this.ConnectionStrings))
            {
                using (SqlCommand cmd = new SqlCommand("GuardarCotizacion", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@IdUsuario", SqlDbType.Int);
                    cmd.Parameters["@IdUsuario"].Value = Token.IdUser;

                    cmd.Parameters.Add("@IdCamion", SqlDbType.Int);
                    cmd.Parameters["@IdCamion"].Value = IdTruck;

                    cmd.Parameters.Add("@DiaSemana", SqlDbType.Int);
                    cmd.Parameters["@DiaSemana"].Value = IdDayOfWeek;

                    con.Open();

                    return int.Parse(cmd.ExecuteScalar().ToString());
                }
            }
        }

        public void SaveDetailQ(Token Token, int IdQ, RequestProducts Product)
        {
            using (SqlConnection con = new SqlConnection(this.ConnectionStrings))
            {
                using (SqlCommand cmd = new SqlCommand("GuardarCotizacionDetalle", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@IdPlanta", SqlDbType.Int);
                    cmd.Parameters["@IdPlanta"].Value = Token.IdPlant;

                    cmd.Parameters.Add("@IdCotizacion", SqlDbType.Int);
                    cmd.Parameters["@IdCotizacion"].Value = IdQ;

                    cmd.Parameters.Add("@IdProducto", SqlDbType.Int);
                    cmd.Parameters["@IdProducto"].Value = Product.Id;

                    cmd.Parameters.Add("@idMedida", SqlDbType.Int);
                    cmd.Parameters["@idMedida"].Value = Product.IdMeasure;

                    cmd.Parameters.Add("@Cantidad", SqlDbType.Decimal);
                    cmd.Parameters["@Cantidad"].Value = Product.Amount;

                    con.Open();

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public int GetLastQ(Token Token)
        {
            using (SqlConnection con = new SqlConnection(this.ConnectionStrings))
            {
                using (SqlCommand cmd = new SqlCommand("UltimaCotizacion", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@idUsuario", SqlDbType.Int);
                    cmd.Parameters["@idUsuario"].Value = Token.IdUser;

                    con.Open();

                    return int.Parse(cmd.ExecuteScalar().ToString());
                }
            }
        }

        public void UpdateLastQ(int IdQ, UserData Data)
        {
            using (SqlConnection con = new SqlConnection(this.ConnectionStrings))
            {
                using (SqlCommand cmd = new SqlCommand("ActualizarDatosCotizacion", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@Id", SqlDbType.Int);
                    cmd.Parameters["@Id"].Value = IdQ;

                    cmd.Parameters.Add("@nombre", SqlDbType.VarChar, 200);
                    cmd.Parameters["@nombre"].Value = Data.Name;

                    cmd.Parameters.Add("@email", SqlDbType.VarChar, 100);
                    cmd.Parameters["@email"].Value = Data.Email;

                    cmd.Parameters.Add("@telefono", SqlDbType.VarChar, 50);
                    cmd.Parameters["@telefono"].Value = Data.Phone;

                    cmd.Parameters.Add("@celular", SqlDbType.VarChar, 50);
                    cmd.Parameters["@celular"].Value = Data.CellPhone;

                    cmd.Parameters.Add("@observaciones", SqlDbType.VarChar, 1000);
                    cmd.Parameters["@observaciones"].Value = Data.Observations;

                    con.Open();

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Truck> GetTruck()
        {
            var list = new List<Truck>();

            using (var con = new SqlConnection(this.ConnectionStrings))
            {
                using (var cmd = new SqlCommand("ObtenerCamiones", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    con.Open();

                    using (var r = cmd.ExecuteReader())
                    {
                        while (r.Read())
                        {
                            list.Add(new Truck
                            {
                                Id = int.Parse(r["Id"].ToString()),
                                Name = r["Nombre"].ToString(),
                                Max = double.Parse(r["Maximo"].ToString())
                            });
                        }
                    }
                }
            }

            return list;
        }

        #endregion
    }
}