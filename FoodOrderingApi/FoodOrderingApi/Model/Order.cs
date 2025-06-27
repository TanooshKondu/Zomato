using System.ComponentModel.DataAnnotations;

namespace FoodOrderingApi.Model;

public class Order
{
    public int Id { get; set; }
    public int UserId { get; set; }

    [Required]
    public string Items { get; set; } = string.Empty; // Store as JSON string

    [Range(0, double.MaxValue)]
    public decimal TotalAmount { get; set; }

    public DateTime OrderDate { get; set; } = DateTime.Now;

    [Required]
    public string Status { get; set; } = "Pending";
}
