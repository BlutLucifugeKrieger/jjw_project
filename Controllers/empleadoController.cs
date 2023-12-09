using JJW_project_web_api.Models;
using JJW_project_web_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace JJW_project_web_api.Controllers
{

    [ApiController]
    [Route("/employe")]
    public class empleadoController
    {

        [HttpPost("login")]
        public async Task<ActionResult<List<empleadoModel>>> employeLogin([FromBody] empleadoModel emp)
        {

            try
            {
                empleadoServices services = new empleadoServices();
                var result = await services.logIn(emp);
                return result;

            }catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return new List<empleadoModel>();
            }
        }

        [HttpPost("enviar_correos_general")]
        public async Task<string> enviarCorreos()
        {
            try
            {
                empleadoServices ser = new empleadoServices();
                await ser.enviarEmailGeneral();
                return "Correo enviado";

            }catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return "Correo no enviado";

            }

        }


        [HttpPost("enviar_correos_cliente")]
        public async Task<string> enviarCorreosClientes()
        {
            try
            {
                empleadoServices ser = new empleadoServices();
                await ser.enviarEmailCliente();
                return "Correo enviado";

            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return "Correo no enviado";

            }

        }

        [HttpPost("enviar_correos_cliente_error/{cc}")]
        public async Task<string> enviarCorreosTasasCliente(string cc)
        {
            try
            {
                empleadoServices ser = new empleadoServices();
                await ser.enviarCorreoErrorCliente(cc);
                return "Correo enviado";

            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return "Correo no enviado";

            }

        }




    }
}
