using System.ComponentModel.DataAnnotations;

namespace ContactsManagement.API.Models
{
    public class Contact
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Firstname is required")]
        public string Firstname { get; set; }
        [Required(ErrorMessage = "Lastname is required")]
        public string Lastname { get; set; }
        [Required(ErrorMessage = "Billing address is required")]
        public string BillingAddress { get; set; }
        [Required(ErrorMessage = "Delivery address is required")]
        public string DeliveryAddress { get; set; }
        [EmailAddress(ErrorMessage = "Invalid email address")]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }
        [StringLength(255, ErrorMessage = "Password must be between 8 and 255 characters", MinimumLength = 8)]
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
