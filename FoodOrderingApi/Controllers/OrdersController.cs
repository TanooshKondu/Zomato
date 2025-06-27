using Microsoft.AspNetCore.Mvc;
using FoodOrderingApi.Data;
using FoodOrderingApi.Model;
using Microsoft.EntityFrameworkCore;
using FoodOrderingApi.Model.Dto;

namespace FoodOrderingApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();
        }

        // POST: api/orders
        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(Order order)
        {
            try
            {
                order.OrderDate = DateTime.Now;
                order.Status = "Pending";

                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetOrders), new { id = order.Id }, order);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PATCH: api/orders/{id}/status
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] StatusUpdateDto request)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
                return NotFound();

            // Optional: validate new status
            if (request.Status != "Pending" && request.Status != "Delivered" && request.Status != "Cancelled")
                return BadRequest("Invalid status");

            order.Status = request.Status;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Status updated successfully" });
        }
    }
}
