using Microsoft.EntityFrameworkCore;
using PRM.API.Entities;

namespace PRM.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Post> Posts { get; set; } = null!;
    }
}
