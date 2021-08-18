using System.Linq;
using HolzraumCatch.Models;
using HolzraumCatch.Services.ModelDataUtils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace HolzraumCatch.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ModelDataController : ControllerBase
    {
        private readonly AppDbContext _ctx;
        private readonly IModelDataService _modelDataSvc;
        private readonly ILogger<ModelDataController> _logger;

        public ModelDataController(ILogger<ModelDataController> logger, AppDbContext ctx, IModelDataService modelDataSvc)
        {
            _logger = logger;
            _ctx = ctx;
            _modelDataSvc = modelDataSvc;
        }

        [HttpGet]
        [Route("{importjobid}")]
        public ActionResult GetModelData([FromRoute] int importjobid)
        {
            return Ok(_modelDataSvc.getView(importjobid));
        }

        [HttpGet]
        [Route("definition")]
        public ActionResult GetModelDataDefinition()
        {
            return Ok(_modelDataSvc.getModelProperties());
        }
    }
}