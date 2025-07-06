using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using DotnetDockerApi;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// 👇 Esto fuerza la carga de appsettings.json si no lo está haciendo automáticamente
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

// Ahora sí puedes obtener la cadena
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Registrar el DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString)
);

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();

// Mapear controladores
app.MapControllers();

// Endpoints de prueba
app.MapGet("/", () => Results.Ok(new { 
    message = "API de Blog en .NET funcionando!", 
    version = "1.0.0",
    endpoints = new {
        posts = "/api/posts",
        categories = "/api/categories", 
        comments = "/api/comments",
        search = "/api/posts/search"
    }
}));

app.MapGet("/api/time", () => Results.Ok(new { 
    localTime = DateTime.Now, 
    utcTime = DateTime.UtcNow 
}));

app.MapGet("/api/db-time", async (HttpContext context) =>
{
    try
    {
        var db = context.RequestServices.GetRequiredService<AppDbContext>();
        var dbTime = await db.Database.SqlQueryRaw<DateTime>("SELECT NOW()").FirstAsync();
        return Results.Ok(new { 
            success = true, 
            localTime = DateTime.Now, 
            dbTime = dbTime 
        });
    }
    catch (Exception ex)
    {
        return Results.Ok(new { 
            success = false, 
            error = ex.Message 
        });
    }
});

// Probar conexión
await DbConnectionTest.TestConnectionAsync(connectionString);

// Endpoint de diagnóstico
app.MapGet("/api/diagnostic", async (HttpContext context) =>
{
    try
    {
        var db = context.RequestServices.GetRequiredService<AppDbContext>();
        
        // Verificar si las tablas existen
        var postsCount = await db.Posts.CountAsync();
        var categoriesCount = await db.Categories.CountAsync();
        var commentsCount = await db.Comments.CountAsync();
        var usersCount = await db.Users.CountAsync();
        
        return Results.Ok(new { 
            success = true, 
            message = "Diagnóstico de la base de datos",
            tables = new {
                posts = postsCount,
                categories = categoriesCount,
                comments = commentsCount,
                users = usersCount
            }
        });
    }
    catch (Exception ex)
    {
        return Results.Ok(new { 
            success = false, 
            error = ex.Message,
            stackTrace = ex.StackTrace
        });
    }
});

// Endpoint de prueba simple para posts
app.MapGet("/api/posts-simple", async (HttpContext context) =>
{
    try
    {
        var db = context.RequestServices.GetRequiredService<AppDbContext>();
        
        // Obtener posts sin relaciones
        var posts = await db.Posts.Take(3).ToListAsync();
        
        return Results.Ok(new { 
            success = true, 
            message = "Posts sin relaciones",
            data = posts
        });
    }
    catch (Exception ex)
    {
        return Results.Ok(new { 
            success = false, 
            error = ex.Message,
            stackTrace = ex.StackTrace
        });
    }
});

app.Run();
