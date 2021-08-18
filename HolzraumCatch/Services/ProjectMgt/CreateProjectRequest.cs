using System.ComponentModel.DataAnnotations;

namespace HolzraumCatch.Services.ProjectMgt
{
    public class CreateProjectRequest
    {
        [Required]
        public string projectName { get; set; }

        [Required]
        public string projectCode { get; set; }

        public string description { get; set; }

        public string address { get; set; }
    }
}