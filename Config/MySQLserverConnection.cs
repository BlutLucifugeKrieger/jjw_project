namespace JJW_project_web_api.Config
{
    public class MySQLserverConnection
    {
        private string _connectionString = string.Empty;


        public MySQLserverConnection()
        {

            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();
            _connectionString = builder.GetSection("ConnectionStrings:MySQLserver").Value;

        }


        public string MysqlConnection()
        {

            return _connectionString;
        }
    }
}
