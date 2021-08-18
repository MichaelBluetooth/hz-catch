using System;
using System.ComponentModel.DataAnnotations;

namespace HolzraumCatch.Models
{
    public abstract class ModelBase
    {
        [Key]
        public int id { get; set; }

        [Required]
        public DateTime created { get; set; }

        [Required]
        public DateTime lastUpdated { get; set; }
    }
}