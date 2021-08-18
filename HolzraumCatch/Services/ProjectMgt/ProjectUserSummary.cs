using System;

namespace HolzraumCatch.Services.ProjectMgt
{
    public class ProjectUserSummary
    {
        public string username { get; set; }

        public int userId { get; set; }

        public string role { get; set; }

        public DateTime created { get; set; }
        public DateTime lastUpdated { get; set; }
    }
}