using JJW_project_web_api.Models;
using JJW_project_web_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace JJW_project_web_api.Controllers
{
    [ApiController]
    [Route("/clientes")]
    public class clientesController
    {

        [HttpGet]
        public async Task<ActionResult<List<clientesModel>>> todosLosUsuarios()
        {
            try
            {
                clientesServices services = new clientesServices();
                var result = await services.obtenerClientes();
                return result;

            }catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return new List<clientesModel>();
            }

        }

        [HttpGet("search/{Identificacion}")]
        public async Task<ActionResult<List<clientesModel>>> obtenerUnUsuarioParticular(int Identificacion)
        {
            try
            {
               clientesServices service = new clientesServices();
                var result = await service.obtenerUnCliente(Identificacion);
                return result;
               

            }catch(Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return new List<clientesModel>();
            }
        }



        [HttpPost]
        public async Task<string> crearCliente([FromBody] clientesModel cli)
        {
            try
            {
                clientesServices service = new clientesServices();
                cli.fecha_desembolso = DateTime.Now;
                await service.crearCliente(cli);
                return "Cliente creado satisfactoriamente";

            }catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return "Error en la creacion de un cliente";

            }

        }


        [HttpPost("login")]
        public async Task<ActionResult<List<clientesModel>>> loginClientes([FromBody] clientesModel cli)
        {
            try
            {
                clientesServices service = new clientesServices();
                var result = await service.login(cli);
                return result;

            }catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return new List<clientesModel>();

            }

        }


    }
}
