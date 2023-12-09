using JJW_project_web_api.Config;
using JJW_project_web_api.Models;
using MySql.Data.MySqlClient;
using System.Net.Mail;

namespace JJW_project_web_api.Services
{
    public class empleadoServices
    {

        public async Task <List<empleadoModel>> logIn(empleadoModel emp)
        {

            MySQLserverConnection conn = new MySQLserverConnection();
            var List = new List<empleadoModel>();

            using(var sql = new MySqlConnection(conn.MysqlConnection()))
            {
                await sql.OpenAsync();

                using(var query = new MySqlCommand("SELECT*FROM transaccional_clientes.Empleados WHERE Cedula_Empleado=@cc AND Contraseña=@contra", sql))
                {
                    query.Parameters.AddWithValue("@cc", emp.Cedula_Empleado);
                    query.Parameters.AddWithValue("@contra", emp.Contraseña);
                    await query.ExecuteNonQueryAsync();

                    using(var read = await query.ExecuteReaderAsync())
                    {

                        while (read.Read())
                        {
                            emp.Nombre_Empleado = (string)read["Nombre_Empleado"];
                            emp.Apellido_Empleado = (string)read["Apellido_Empleado"];
                            emp.Cedula_Empleado = (decimal)read["Cedula_Empleado"];
                            emp.Contraseña = (string)read["Contraseña"];
                            List.Add(emp);
                        }
                    }
                }
            }

            return List;
        }



        public async Task enviarEmailGeneral()
        {

            string emailOrigin = "jjwproject111@outlook.com";
            string emailDestino = "testJJW@outlook.com";
            string contraseña = "Admin556677";
            string path = @"C:\Users\juanl\Downloads\Reporte_general.pdf";

            MailMessage mailMessage = new MailMessage(emailOrigin,emailDestino,"Reportes - tasas erroneas","<b>Dictaminar solucion en 24 horas.</b>");
            mailMessage.Attachments.Add(new Attachment(path));
            mailMessage.IsBodyHtml = true;

            SmtpClient smtpClient = new SmtpClient("smtp.office365.com");
            smtpClient.EnableSsl = true;
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Port = 587;
            smtpClient.Credentials = new System.Net.NetworkCredential(emailOrigin, contraseña);

            smtpClient.Send(mailMessage);

            smtpClient.Dispose();   

        }

        public async Task enviarEmailCliente()
        {

            string emailOrigin = "jjwproject111@outlook.com";
            string emailDestino = "testJJW@outlook.com";
            string contraseña = "Admin556677";
            string path = @"C:\Users\juanl\Downloads\Reporte_cliente.pdf";

            MailMessage mailMessage = new MailMessage(emailOrigin, emailDestino, "Reportes - tasas erroneas", "<b>Dictaminar solucion en 24 horas.</b>");
            mailMessage.Attachments.Add(new Attachment(path));
            mailMessage.IsBodyHtml = true;

            SmtpClient smtpClient = new SmtpClient("smtp.office365.com");
            smtpClient.EnableSsl = true;
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Port = 587;
            smtpClient.Credentials = new System.Net.NetworkCredential(emailOrigin, contraseña);

            smtpClient.Send(mailMessage);

            smtpClient.Dispose();

        }


        public async Task enviarCorreoErrorCliente(string cc)
        {

            string emailOrigin = "jjwproject111@outlook.com";
            string emailDestino = "testJJW@outlook.com";
            string contraseña = "Admin556677";
          

            MailMessage mailMessage = new MailMessage(emailOrigin, emailDestino, $"Reportes - tasas erroneas", $"<b>El cliente identificado con el documento {cc} tiene informacion incongruente asociada a sus tasas de interes, Por favor solucionar dentro de 24 horas.</b>");

            mailMessage.IsBodyHtml = true;

            SmtpClient smtpClient = new SmtpClient("smtp.office365.com");
            smtpClient.EnableSsl = true;
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Port = 587;
            smtpClient.Credentials = new System.Net.NetworkCredential(emailOrigin, contraseña);

            smtpClient.Send(mailMessage);

            smtpClient.Dispose();

        }



    }
}
