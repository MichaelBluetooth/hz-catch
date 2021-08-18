using System;

namespace HolzraumCatch.Services.ProjectMgt
{
    public class ProjectDTO
    {
        public int id { get; set; }
        public string projectName { get; set; }
        public string projectCode { get; set; }
        public string description { get; set; }
        public string address { get; set; }
        public DateTime created { get; set; }
        public DateTime lastUpdated { get; set; }

    }
}