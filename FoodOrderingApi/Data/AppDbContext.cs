using FoodOrderingApi.Model;
using Microsoft.EntityFrameworkCore;

namespace FoodOrderingApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<ClientUser> ClientUsers { get; set; }
        public DbSet<AdminUser> AdminUsers { get; set; }
        public DbSet<FoodItem> FoodItems => Set<FoodItem>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<Category> Categories { get; set; }
        public DbSet<Restaurant> Restaurants { get; set; }

        public DbSet<Users> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FoodItem>()
                .Property(f => f.Price)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Order>()
                .Property(o => o.TotalAmount)
                .HasPrecision(18, 2);

            // Seed Categories
            modelBuilder.Entity<Category>().HasData(
                new Category { CategoryId = 1, CategoryName = "South Indian" },
                new Category { CategoryId = 2, CategoryName = "North Indian" },
                new Category { CategoryId = 3, CategoryName = "Chinese" },
                new Category { CategoryId = 4, CategoryName = "Fast Food" }
            );

            // Seed Restaurants
            modelBuilder.Entity<Restaurant>().HasData(
                new Restaurant { RestaurantId = 1, RestaurantName = "Andhra Spice" },
                new Restaurant { RestaurantId = 2, RestaurantName = "Delhi Tadka" },
                new Restaurant { RestaurantId = 3, RestaurantName = "Wok This Way" },
                new Restaurant { RestaurantId = 4, RestaurantName = "Burger Factory" }
            );

            // Seed Food Items (Make sure CategoryId and RestaurantId exist)
            modelBuilder.Entity<FoodItem>().HasData(
                new FoodItem { FoodItemId = 1, Name = "Masala Dosa", Price = 60, CategoryId = 1, RestaurantId = 1 },
                new FoodItem { FoodItemId = 2, Name = "Idli Sambar", Price = 40, CategoryId = 1, RestaurantId = 1 },
                new FoodItem { FoodItemId = 3, Name = "Paneer Butter Masala", Price = 150, CategoryId = 2, RestaurantId = 2 },
                new FoodItem { FoodItemId = 4, Name = "Chole Bhature", Price = 90, CategoryId = 2, RestaurantId = 2 },
                new FoodItem { FoodItemId = 5, Name = "Veg Manchurian", Price = 120, CategoryId = 3, RestaurantId = 3 },
                new FoodItem { FoodItemId = 6, Name = "Hakka Noodles", Price = 110, CategoryId = 3, RestaurantId = 3 },
                new FoodItem { FoodItemId = 7, Name = "Cheese Burger", Price = 80, CategoryId = 4, RestaurantId = 4 },
                new FoodItem { FoodItemId = 8, Name = "French Fries", Price = 50, CategoryId = 4, RestaurantId = 4 }
            );
        }
    }
}
