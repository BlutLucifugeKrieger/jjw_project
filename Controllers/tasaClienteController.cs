using JJW_project_web_api.Models;
using JJW_project_web_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace JJW_project_web_api.Controllers
{
    [ApiController]
    [Route("/tasa_cliente")]
    public class tasaClienteController
    {

        [HttpGet("{id}")]
        public async Task<ActionResult<List<tasaClienteModel>>> obtenerTasaCliente(int id)
        {

            try
            {

                tasaClienteServices services = new tasaClienteServices();
                var result = await services.tasaCliente(id);
                return result;

            } catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return new List<tasaClienteModel>();

            }

        }

        [HttpPost("mes/{mes}")]
        public async Task<ActionResult<List<tasaClienteModel>>> tasa_por_fecha(int mes, [FromBody] tasaClienteModel tas)
        {
            try
            {
                var services = new tasaClienteServices();

                var result =  await services.tasaMes(mes,tas);
                return result;

            }catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return new List<tasaClienteModel>();
            }

        }


        [HttpGet("total_mes/{mes}")]
        public async Task<ActionResult<List<tasaClienteModel>>> obtenerTodasLasTasasPorMes(int mes)
        {
            try
            {
                tasaClienteServices services = new tasaClienteServices();
                var result = await services.totalTasaMes(mes);
                return result;

            }catch(Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return new List<tasaClienteModel>();
            }

        }

        [HttpGet("nombres/{id}")]
        public async Task<ActionResult<List<clientesModel>>> obtener(int id)
        {
            try
            {
                tasaClienteServices services = new tasaClienteServices();
                var result = await services.nombreClientePorId(id);
                return result;

            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return new List<clientesModel>();
            }

        }

        [HttpGet("info_cliente/{identificacion}")]
        public async Task<ActionResult<List<object>>> infoCliente(int identificacion)
        {
            try
            {
                tasaClienteServices ser = new tasaClienteServices();
                var result = await ser.totalInfoClientes(identificacion);
                return result;

            }
            catch(Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return new List<object>();

            }

        }



    }
}
