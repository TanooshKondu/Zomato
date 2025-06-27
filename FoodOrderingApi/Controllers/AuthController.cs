using FoodOrderingApi.Data;
using FoodOrderingApi.Model;
using Microsoft.AspNetCore.Mvc;

namespace FoodDeliveryApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // CLIENT REGISTER
        [HttpPost("register")]
        public IActionResult Register(ClientUser client)
        {
            var exists = _context.ClientUsers.FirstOrDefault(u => u.Email == client.Email);
            if (exists != null) return BadRequest("Email already registered.");

            _context.ClientUsers.Add(client);
            _context.SaveChanges();
            return Ok("Registration successful.");
        }

        // CLIENT LOGIN
        [HttpPost("client-login")]
        public IActionResult ClientLogin(ClientUser login)
        {
            var user = _context.ClientUsers.FirstOrDefault(u =>
                u.Email == login.Email && u.Password == login.Password);

            if (user == null) return Unauthorized("Invalid credentials.");
            return Ok(new { Message = "Login successful", Role = "Client", UserId = user.Id, Name = user.FullName });
        }

        // ADMIN LOGIN
        [HttpPost("admin-login")]
        public IActionResult AdminLogin(AdminUser login)
        {
            var admin = _context.AdminUsers.FirstOrDefault(a =>
                a.Username == login.Username && a.Password == login.Password);

            if (admin == null) return Unauthorized("Invalid admin credentials.");
            return Ok(new { Message = "Admin login successful", Role = "Admin", AdminId = admin.Id });
        }

        // FORGOT PASSWORD (Client)
        [HttpPost("client-forgot")]
        public IActionResult ClientForgot([FromBody] string email)
        {
            var user = _context.ClientUsers.FirstOrDefault(u => u.Email == email);
            if (user == null) return NotFound("Email not found.");
            return Ok("Reset link sent to email (simulate).");
        }

        // FORGOT PASSWORD (Admin)
        [HttpPost("admin-forgot")]
        public IActionResult AdminForgot([FromBody] string username)
        {
            var admin = _context.AdminUsers.FirstOrDefault(u => u.Username == username);
            if (admin == null) return NotFound("Admin not found.");
            return Ok("Reset link sent to admin (simulate).");
        }
    }
}
