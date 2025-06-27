using FoodOrderingApi.Model;

namespace FoodOrderingApi.Data
{
    public static class DataSeeder
    {
        public static void SeedAdminUser(AppDbContext context)
        {
            if (!context.Users.Any(u => u.Role == "admin"))
            {
                var admin = new Users
                {
                    Username = "admin",
                    Phone = "9110523265",
                    Password = "admin123",  // Use hashed password for production
                    Role = "admin"
                };

                context.Users.Add(admin);
                context.SaveChanges();
            }
        }
    }
}
