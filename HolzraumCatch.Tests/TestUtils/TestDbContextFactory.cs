using HolzraumCatch.Models;
using Microsoft.EntityFrameworkCore;

namespace HolzraumCatch.Tests.TestUtils
{
    public class TestDbContextFactory
    {
        public static AppDbContext GetContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                     .UseInMemoryDatabase(databaseName: "AppDbContextTest")
                     .Options;
            return new AppDbContext(options);
        }
    }
}