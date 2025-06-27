namespace FoodOrderingApi.Model
{
    public class Restaurant
    {
        public int RestaurantId { get; set; } // Primary Key
        public string? RestaurantName { get; set; }
        public string? Address { get; set; }

        // Navigation property
        public ICollection<FoodItem>? FoodItems { get; set; }
    }
}
