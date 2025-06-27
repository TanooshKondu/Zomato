namespace FoodOrderingApi.Model
{
    public class FoodItem
    {
        public int FoodItemId { get; set; }
        public string? Name { get; set; }
        public decimal Price { get; set; }

        // Foreign Keys
        public int CategoryId { get; set; }
        public Category? Category { get; set; }

        public int RestaurantId { get; set; }
        public Restaurant? Restaurant { get; set; }
    }

}
