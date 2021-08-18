using System;
using System.Collections.Generic;
using HolzraumCatch.Models;

namespace HolzraumCatch.Services.ModelDataUtils
{
    public class ModelDataView
    {
        public ModelDataDefinition definition { get; set; }
        public ICollection<ModelData> data { get; set; }
        public int projectId { get; set; }
        public string projectName { get; set; }
        public int importId { get; set; }
        public string importFileName { get; set; }
        public DateTime importRunDate { get; set; }
        public string importPhase { get; set; }
    }
}