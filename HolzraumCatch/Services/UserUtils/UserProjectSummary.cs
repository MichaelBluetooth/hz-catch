using System;

namespace HolzraumCatch.Services.UserUtils {
    public class UserProjectSummary {
        public int projectId { get; set; }
        public string projectName { get; set; }
        public string projectCode { get; set; }
        public string projectPhase { get; set; }
        public DateTime created { get; set; }
        public string description { get; set; }
        public string address { get; set; }
        public string role { get; set; }
    }
}