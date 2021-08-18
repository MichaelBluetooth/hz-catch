using System;
using System.Collections.Generic;
using HolzraumCatch.Services.Import;

namespace HolzraumCatch.Services.ProjectMgt
{
    public class ProjectSummary
    {
        public int id { get; set; }
        public string projectName { get; set; }

        public DateTime created { get; set; }

        public DateTime lastUpdated { get; set; }

        public string projectCode { get; set; }

        public string description { get; set; }

        public string address { get; set; }

        public ICollection<ProjectUserSummary> projectUsers { get; set; }

        public ICollection<ImportSummary> imports { get; set; }

        public ICollection<ModelSummary> scopes { get; set; }
        public ICollection<ModelSummary> slices { get; set; }
        public ICollection<ModelSummary> panels { get; set; }
        public ICollection<ModelSummary> functions { get; set; }
        public ICollection<ModelSummary> materials { get; set; }
    }
}