using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 👇 Esto fuerza la carga de appsettings.json si no lo está haciendo automáticamente
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

// Ahora sí puedes obtener la cadena
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Registrar el DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString)
);

var app = builder.Build();

// Ruta de prueba
app.MapGet("/hello", () => "Hola mundo desde .NET");

// Probar conexión
await DbConnectionTest.TestConnectionAsync(connectionString);

app.Run();
