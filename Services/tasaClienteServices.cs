using JJW_project_web_api.Config;
using JJW_project_web_api.Models;
using MySql.Data.MySqlClient;
using System.Threading.Tasks;

namespace JJW_project_web_api.Services
{
    public class tasaClienteServices
    {
        public async Task<List<tasaClienteModel>> tasaCliente(int id)
        {

            MySQLserverConnection conn = new MySQLserverConnection();
            var List = new List<tasaClienteModel>();

            using(var sql = new MySqlConnection(conn.MysqlConnection()))
            {

                await sql.OpenAsync();

                using(var query = new MySqlCommand("SELECT*FROM Clientes INNER JOIN Tasa_Cliente ON Clientes.Id_Cliente=Tasa_Cliente.Cliente_Id WHERE Id_Cliente=@id", sql))
                {
                    query.Parameters.AddWithValue("@id", id);
                    await query.ExecuteNonQueryAsync();

                    using(var read = await query.ExecuteReaderAsync())
                    {
                        while (read.Read())
                        {
                            tasaClienteModel tas = new tasaClienteModel();
                            tas.Secuencial = (int)read["Secuencial"];
                            tas.Cliente_Id = (int)read["Cliente_Id"];
                            tas.Fecha_Modificacion = (DateTime)read["Fecha_Modificacion"];
                            tas.Cuota = (int)read["Cuota"];
                            tas.Rubro = (string)read["Rubro"];
                            tas.Tasa_Actual = (decimal)read["Tasa_Actual"];
                            tas.Tasa_Efectiva = (decimal)read["Tasa_Efectiva"];
                            List.Add(tas);
                        }
                    }

                }
            }

            return List;
        }


        public async Task<List<tasaClienteModel>> tasaMes(int mes, tasaClienteModel tas)
        {

            MySQLserverConnection conn = new MySQLserverConnection();
            var List = new List<tasaClienteModel>();

            using(var sql = new MySqlConnection(conn.MysqlConnection()))
            {
                await sql.OpenAsync();

                using(var query = new MySqlCommand("SELECT*FROM Tasa_Cliente WHERE MONTH(Fecha_Modificacion) = @fecha AND Cliente_Id=@id ", sql))
                {
                    query.Parameters.AddWithValue("@fecha", mes);
                    query.Parameters.AddWithValue("@id", tas.Cliente_Id);
                    await query.ExecuteNonQueryAsync();

                    using(var read = await query.ExecuteReaderAsync())
                    {
                        while (read.Read())
                        {
                            tasaClienteModel tasa = new tasaClienteModel();
                            tasa.Secuencial = (int)read["Secuencial"];
                            tasa.Cliente_Id = (int)read["Cliente_Id"];
                            tasa.Fecha_Modificacion = (DateTime)read["Fecha_Modificacion"];
                            tasa.Cuota = (int)read["Cuota"];
                            tasa.Rubro = (string)read["Rubro"];
                            tasa.Tasa_Actual = (decimal)read["Tasa_Actual"];
                            tasa.Tasa_Efectiva = (decimal)read["Tasa_Efectiva"];
                            List.Add(tasa);
                        }
                    }
                }
            }

            return List;


        }



        public async Task<List<tasaClienteModel>> totalTasaMes(int mes)
        {
            MySQLserverConnection conn = new MySQLserverConnection();
            var List = new List<tasaClienteModel>();

            using (var sql = new MySqlConnection(conn.MysqlConnection()))
            {
                await sql.OpenAsync();

                using (var query = new MySqlCommand("SELECT*FROM Tasa_Cliente WHERE MONTH(Fecha_Modificacion) = @fecha ", sql))
                {
                    query.Parameters.AddWithValue("@fecha", mes);
                    
                    await query.ExecuteNonQueryAsync();

                    using (var read = await query.ExecuteReaderAsync())
                    {
                        while (read.Read())
                        {
                            tasaClienteModel tasa = new tasaClienteModel();
                            tasa.Secuencial = (int)read["Secuencial"];
                            tasa.Cliente_Id = (int)read["Cliente_Id"];
                            tasa.Fecha_Modificacion = (DateTime)read["Fecha_Modificacion"];
                            tasa.Cuota = (int)read["Cuota"];
                            tasa.Rubro = (string)read["Rubro"];
                            tasa.Tasa_Actual = (decimal)read["Tasa_Actual"];
                            tasa.Tasa_Efectiva = (decimal)read["Tasa_Efectiva"];
                            List.Add(tasa);
                        }
                    }
                }
            }

            return List;


        }





        public async Task<List<clientesModel>> nombreClientePorId(int id)
        {
            MySQLserverConnection conn = new MySQLserverConnection();
            var List = new List<clientesModel>();

            using (var sql = new MySqlConnection(conn.MysqlConnection()))
            {
                await sql.OpenAsync();

                using (var query = new MySqlCommand("SELECT*FROM Tasa_Cliente INNER JOIN Clientes ON Tasa_Cliente.Cliente_Id = Clientes.Id_Cliente WHERE Cliente_Id=@id LIMIT 1", sql))
                {
                    query.Parameters.AddWithValue("@id", id);

                    await query.ExecuteNonQueryAsync();

                    using (var read = await query.ExecuteReaderAsync())
                    {
                        while (read.Read())
                        {
                            clientesModel model = new clientesModel();
                            model.Id_Cliente = (int)read["Id_Cliente"];
                            model.Nombre_Cliente = (string)read["Nombre_Cliente"];
                            model.Edad = (int)read["Edad"];
                            model.Monto_Aprobado = (decimal)read["Monto_Aprobado"];
                            model.monto_desembolsar = (decimal)read["monto_desembolsar"];
                            model.Identificacion = (decimal)read["Identificacion"];
                            model.apellidos = (string)read["apellidos"];
                            model.fecha_desembolso = (DateTime)read["fecha_desembolso"];
                            model.Credito = (string)read["Credito"];
                            model.tipo_amortiza = (string)read["tipo_amortiza"];
                            model.plazo = (short)read["plazo"];
                            model.monto = (decimal)read["monto"];
                            model.monto_uvr = (float)read["monto_uvr"];
                            model.tasa = (decimal)read["tasa"];
                            model.tramite = (int)read["tramite"];
                            model.Contraseña = (string)read["Contraseña"];
                            List.Add(model);
                        }
                    }
                }
            }

            return List;


        }


        public async Task<List<object>> totalInfoClientes(int ide)
        {
            MySQLserverConnection conn = new MySQLserverConnection();
            var List = new List<object>();

            using (var sql = new MySqlConnection(conn.MysqlConnection()))
            {
                await sql.OpenAsync();

                using (var query = new MySqlCommand("SELECT*FROM Clientes INNER JOIN Tasa_Cliente ON Clientes.Id_Cliente = Tasa_Cliente.Cliente_Id WHERE Identificacion=@iden;", sql))
                {
                    query.Parameters.AddWithValue("@iden", ide);

                    await query.ExecuteNonQueryAsync();

                    using (var read = await query.ExecuteReaderAsync())
                    {
                        while (read.Read())
                        {
                            clientesModel model = new clientesModel();
                            tasaClienteModel tasa = new tasaClienteModel();

                            model.Id_Cliente = (int)read["Id_Cliente"];
                            model.Nombre_Cliente = (string)read["Nombre_Cliente"];
                            model.Edad = (int)read["Edad"];
                            model.Monto_Aprobado = (decimal)read["Monto_Aprobado"];
                            model.monto_desembolsar = (decimal)read["monto_desembolsar"];
                            model.Identificacion = (decimal)read["Identificacion"];
                            model.apellidos = (string)read["apellidos"];
                            model.fecha_desembolso = (DateTime)read["fecha_desembolso"];
                            model.Credito = (string)read["Credito"];
                            model.tipo_amortiza = (string)read["tipo_amortiza"];
                            model.plazo = (short)read["plazo"];
                            model.monto = (decimal)read["monto"];
                            model.monto_uvr = (float)read["monto_uvr"];
                            model.tasa = (decimal)read["tasa"];
                            model.tramite = (int)read["tramite"];
                            model.Contraseña = (string)read["Contraseña"];
                            List.Add(model);

                            tasa.Secuencial = (int)read["Secuencial"];
                            tasa.Cliente_Id = (int)read["Cliente_Id"];
                            tasa.Fecha_Modificacion = (DateTime)read["Fecha_Modificacion"];
                            tasa.Cuota = (int)read["Cuota"];
                            tasa.Rubro = (string)read["Rubro"];
                            tasa.Tasa_Actual = (decimal)read["Tasa_Actual"];
                            tasa.Tasa_Efectiva = (decimal)read["Tasa_Efectiva"];
                            List.Add(tasa);

                            
                        }
                    }
                }
            }

            return List;


        }




    }


    
}
