using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HolzraumCatch.Models
{
    public class ProjectUser : ModelBase
    {
        [Required]
        [ForeignKey("user")]
        public int userId { get; set; }
        public User user { get; set; }

        [Required]
        [ForeignKey("project")]
        public int projectId { get; set; }
        public Project project { get; set; }

        [Required]
        public string role { get; set; }

        public sealed class ProjectUserRoles
        {
            /// <summary>
            /// Full permissions
            /// </summary>
            public static readonly string OWNER = "owner";

            /// <summary>
            /// Make make edits, but cannot delete things
            /// </summary>
            public static readonly string CONTRIBUTOR = "contributor";

            /// <summary>
            /// May only view
            /// </summary>
            public static readonly string VIEWER = "viewer";

            public ICollection<string> ALL = new Collection<string>(){
                OWNER,
                CONTRIBUTOR,
                VIEWER
            };
        }
    }
}