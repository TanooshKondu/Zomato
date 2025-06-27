using System.Text.Json.Serialization;

namespace FoodOrderingApi.Model
{
    public class Category
    {
        public int CategoryId { get; set; } // Primary Key
        public string? CategoryName { get; set; }

        // Navigation property

        [JsonIgnore]
        public ICollection<FoodItem>? FoodItems { get; set; }
    }
}
