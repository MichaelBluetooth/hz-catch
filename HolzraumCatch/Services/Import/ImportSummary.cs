using System;

namespace HolzraumCatch.Services.Import
{
    public class ImportSummary
    {
        public int importId { get; set; }
        public string fileName { get; set; }
        public string projectPhase { get; set; }
        public DateTime runDate { get; set; }
        public bool isActive { get; set; }
    }
}