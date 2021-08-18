using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HolzraumCatch.Models
{
    public class ImportJob : ModelBase
    {
        [Required]
        public DateTime runDate { get; set; }

        [Required]
        [ForeignKey("runUser")]
        public int runUserId { get; set; }
        public User runUser { get; set; }

        [Required]
        [ForeignKey("project")]
        public int projectId { get; set; }
        public Project project { get; set; }

        [Required]
        [MaxLength(140)]
        public string fileName { get; set; }

        [Required]
        [MaxLength(140)]
        public string projectPhase { get; set; }

        public bool isActive { get; set; } = false;
    }
}