namespace JJW_project_web_api.Models
{
    public class clientesModel
    {
        public int Id_Cliente { get; set; }
        public string? Nombre_Cliente { get; set; }
        public int Edad { get; set; }
        public decimal Monto_Aprobado { get; set;}
        public decimal monto_desembolsar { get; set; }
        public decimal Identificacion { get; set; }
        public string? apellidos { get; set;}

        public DateTime fecha_desembolso {  get; set; }
        public string? Credito { get; set; }
        public string? tipo_amortiza { get; set;}
        public short plazo { get; set; }
        public decimal monto { get; set; }
        public float monto_uvr { get; set; }
        public decimal tasa { get; set; }
        public int tramite { get; set; }
        public string Contraseña { get; set; }

    }
}
