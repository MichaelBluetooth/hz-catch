using Microsoft.EntityFrameworkCore;

namespace HolzraumCatch.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectUser> ProjectUsers { get; set; }
        public DbSet<ImportJob> ImportJobs { get; set; }
        public DbSet<ModelData> ModelData { get; set; }
        public DbSet<HzFunction> HzFunctions { get; set; }
    }
}