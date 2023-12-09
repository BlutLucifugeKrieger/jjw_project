namespace JJW_project_web_api.Models
{
    public class tasaClienteModel
    {
        public int Secuencial { get; set; }
        public int Cliente_Id { get; set; }
        public DateTime Fecha_Modificacion { get; set; }
        public int Cuota { get; set; }
        public string? Rubro { get; set; }
        public decimal Tasa_Actual { get; set; }
        public decimal Tasa_Efectiva {  get; set; }
    }
}
