using System.ComponentModel.DataAnnotations;

namespace HolzraumCatch.Models
{
    public class HzFunction : ModelBase
    {
        [Required]
        [MaxLength(40)]
        public string name { get; set; }
    }
}