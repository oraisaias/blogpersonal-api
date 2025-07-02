using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) {}

    // Aquí defines tus tablas
    // public DbSet<Usuario> Usuarios { get; set; }
}
