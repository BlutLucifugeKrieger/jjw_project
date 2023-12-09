namespace JJW_project_web_api.config
{
    public class SQLserverConnection
    {
        private string _connectionString = string.Empty;

        public SQLserverConnection() 
        
        {   
            var build = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();
            _connectionString = build.GetSection("ConnectionStrings:SQLserver").Value;
        
        }


        public string dbConnection()
        {

            return _connectionString;
        }


    }
}
