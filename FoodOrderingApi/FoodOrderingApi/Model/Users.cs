namespace FoodOrderingApi.Model
{
    public class Users
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Phone { get; set; }
        public string? Password { get; set; }  // Store hashed in production
        public string? Role { get; set; }
    }

}
