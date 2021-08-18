using System.ComponentModel.DataAnnotations;

namespace HolzraumCatch.Models
{
    public class User : ModelBase
    {
        [Required]
        [MaxLength(255)]
        public string username { get; set; }

        [Required]
        [MaxLength(255)]
        [EmailAddress]
        public string email { get; set; }

        [Required]
        [MaxLength(255)]
        public string password { get; set; }
    }
}