using JJW_project_web_api.config;
using JJW_project_web_api.Config;
using JJW_project_web_api.Models;
using MySql.Data.MySqlClient;
using System.Data.SqlClient;
using System.Runtime.InteropServices;

namespace JJW_project_web_api.Services
{
    public class clientesServices
    {

        public async Task<List<clientesModel>> obtenerClientes()
        {
            MySQLserverConnection conn = new MySQLserverConnection();
            var List = new List<clientesModel>();

            using (var sql = new MySqlConnection(conn.MysqlConnection()))
            {
                await sql.OpenAsync();

                using(var query = new MySqlCommand("SELECT*FROM transaccional_clientes.Clientes", sql))
                {
                    await query.ExecuteNonQueryAsync();

                    using(var read = await query.ExecuteReaderAsync())
                    {

                        while(read.Read())
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



        public async Task crearCliente(clientesModel cli)
        {
            MySQLserverConnection conn = new MySQLserverConnection();

            using(var sql = new MySqlConnection(conn.MysqlConnection()))
            {
               await sql.OpenAsync();

                using (var query = new MySqlCommand("INSERT INTO transaccional_clientes.Clientes(Nombre_Cliente,Edad,Monto_Aprobado,monto_desembolsar,Identificacion,apellidos,fecha_desembolso,Credito,tipo_amortiza,plazo,monto,monto_uvr,tasa,tramite,Contraseña) VALUES(@nombrecliente,@edad,@montoaprobado,@montodesembolsar,@identificacion,@apellidos,@fechadesembolso,@credito,@tipoamortiza,@plazo,@monto,@montouvr,@tasa,@tramite,@contraseña)", sql))
                {

                    query.Parameters.AddWithValue("@nombrecliente", cli.Nombre_Cliente);
                    query.Parameters.AddWithValue("@edad", cli.Edad);
                    query.Parameters.AddWithValue("@montoaprobado", cli.Monto_Aprobado);
                    query.Parameters.AddWithValue("@montodesembolsar", cli.monto_desembolsar);
                    query.Parameters.AddWithValue("@identificacion", cli.Identificacion);
                    query.Parameters.AddWithValue("@apellidos", cli.apellidos);
                    query.Parameters.AddWithValue("@fechadesembolso", cli.fecha_desembolso);
                    query.Parameters.AddWithValue("@credito", cli.Credito);
                    query.Parameters.AddWithValue("@tipoamortiza", cli.tipo_amortiza);
                    query.Parameters.AddWithValue("@plazo", cli.plazo);
                    query.Parameters.AddWithValue("@monto", cli.monto);
                    query.Parameters.AddWithValue("@montouvr", cli.monto_uvr);
                    query.Parameters.AddWithValue("@tasa", cli.tasa);
                    query.Parameters.AddWithValue("@tramite", cli.tramite);
                    query.Parameters.AddWithValue("@contraseña", cli.Contraseña);
                    await query.ExecuteNonQueryAsync();
                }
            }

        }
        

        public async Task<List<clientesModel>> login(clientesModel cli)
        {
            var list = new List<clientesModel>();
            MySQLserverConnection conn = new MySQLserverConnection();

            using(var sql = new MySqlConnection(conn.MysqlConnection()))
            {
                await sql.OpenAsync();

                using(var query = new MySqlCommand("SELECT*FROM transaccional_clientes.Clientes WHERE Identificacion=@ident AND Contraseña=@contra", sql))
                {
                    query.Parameters.AddWithValue("@ident", cli.Identificacion);
                    query.Parameters.AddWithValue("@contra", cli.Contraseña);
                    await query.ExecuteNonQueryAsync();

                    using(var read = await query.ExecuteReaderAsync())
                    {
                        while (read.Read())
                        {
                            cli.Id_Cliente = (int)read["Id_Cliente"];
                            cli.Nombre_Cliente = (string)read["Nombre_Cliente"];
                            cli.Edad = (int)read["Edad"];
                            cli.Monto_Aprobado = (decimal)read["Monto_Aprobado"];
                            cli.monto_desembolsar = (decimal)read["monto_desembolsar"];
                            cli.Identificacion = (decimal)read["Identificacion"];
                            cli.apellidos = (string)read["apellidos"];
                            cli.fecha_desembolso = (DateTime)read["fecha_desembolso"];
                            cli.Credito = (string)read["Credito"];
                            cli.tipo_amortiza = (string)read["tipo_amortiza"];
                            cli.plazo = (short)read["plazo"];
                            cli.monto = (decimal)read["monto"];
                            cli.monto_uvr = (float)read["monto_uvr"];
                            cli.tasa = (decimal)read["tasa"];
                            cli.tramite = (int)read["tramite"];
                            cli.Contraseña = (string)read["Contraseña"];
                            list.Add(cli);
                        }
                    }
                }
            }

            return list;


        }



        public async Task <List<clientesModel>> obtenerUnCliente(int Identificacion)
        {

            MySQLserverConnection conn = new MySQLserverConnection();
            var List = new List<clientesModel>();

            using(var sql = new MySqlConnection(conn.MysqlConnection()))
            {
                await sql.OpenAsync();

                using(var query = new MySqlCommand("SELECT*FROM transaccional_clientes.Clientes WHERE Identificacion=@iden", sql))
                {
                    query.Parameters.AddWithValue("@iden", Identificacion);
                    await query.ExecuteNonQueryAsync();

                    using(var read = await query.ExecuteReaderAsync())
                    {
                        while (read.Read())
                        {
                            clientesModel cli = new clientesModel();
                            cli.Id_Cliente = (int)read["Id_Cliente"];
                            cli.Nombre_Cliente = (string)read["Nombre_Cliente"];
                            cli.Edad = (int)read["Edad"];
                            cli.Monto_Aprobado = (decimal)read["Monto_Aprobado"];
                            cli.monto_desembolsar = (decimal)read["monto_desembolsar"];
                            cli.Identificacion = (decimal)read["Identificacion"];
                            cli.apellidos = (string)read["apellidos"];
                            cli.fecha_desembolso = (DateTime)read["fecha_desembolso"];
                            cli.Credito = (string)read["Credito"];
                            cli.tipo_amortiza = (string)read["tipo_amortiza"];
                            cli.plazo = (short)read["plazo"];
                            cli.monto = (decimal)read["monto"];
                            cli.monto_uvr = (float)read["monto_uvr"];
                            cli.tasa = (decimal)read["tasa"];
                            cli.tramite = (int)read["tramite"];
                            cli.Contraseña = (string)read["Contraseña"];
                            List.Add(cli);
                        }
                    }

                }
            }

            return List;
        }



    }
}
