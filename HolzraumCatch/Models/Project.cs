using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HolzraumCatch.Models
{
    public class Project : ModelBase
    {
        [Required]
        [MaxLength(255)]
        public string projectName { get; set; }

        [Required]
        [MaxLength(40)]
        public string projectCode { get; set; }

        [MaxLength(255)]
        public string description { get; set; }

        [MaxLength(140)]
        public string address { get; set; }

        public ICollection<ProjectUser> projectUsers { get; set; }

        public ICollection<ImportJob> imports { get; set; }
    }
}