using FoodOrderingApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodOrderingApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodItemsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FoodItemsController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/fooditems
        [HttpGet]
        public async Task<IActionResult> GetAllFoodItems()
        {
            var foodItems = await _context.FoodItems
                .Include(f => f.Category)
                .Include(f => f.Restaurant)
                .ToListAsync();

            return Ok(foodItems);
        }

        // GET: api/fooditems/bycategory/{categoryId}
        [HttpGet("bycategory/{categoryId}")]
        public async Task<IActionResult> GetFoodItemsByCategory(int categoryId)
        {
            var foodItems = await _context.FoodItems
                .Where(f => f.CategoryId == categoryId)
                .Include(f => f.Category)
                .Include(f => f.Restaurant)
                .ToListAsync();

            return Ok(foodItems);
        }

        // GET: api/fooditems/byrestaurant/{restaurantId}
        [HttpGet("byrestaurant/{restaurantId}")]
        public async Task<IActionResult> GetFoodItemsByRestaurant(int restaurantId)
        {
            var foodItems = await _context.FoodItems
                .Where(f => f.RestaurantId == restaurantId)
                .Include(f => f.Category)
                .Include(f => f.Restaurant)
                .ToListAsync();

            return Ok(foodItems);
        }
    }
}
