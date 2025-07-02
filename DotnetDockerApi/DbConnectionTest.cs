using System;
using System.Threading.Tasks;
using Npgsql;

public static class DbConnectionTest
{
    public static async Task<bool> TestConnectionAsync(string connectionString)
    {
        try
        {
            using var conn = new NpgsqlConnection(connectionString);
            await conn.OpenAsync();
            Console.WriteLine("✅ Conexión a la base de datos exitosa.");
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine("❌ Error al conectar a la base de datos:");
            Console.WriteLine(ex.Message);
            return false;
        }
    }
}
