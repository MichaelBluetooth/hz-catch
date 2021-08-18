using HolzraumCatch.Services.Functions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace HolzraumCatch.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class HzFunctionsController : ControllerBase
    {
        private readonly IHzFunctionService _functions;
        private readonly ILogger<HzFunctionsController> _logger;

        public HzFunctionsController(ILogger<HzFunctionsController> logger, IHzFunctionService functions)
        {
            _logger = logger;
            _functions = functions;
        }

        [HttpGet]
        public ActionResult GetFunctions([FromRoute] int importjobid)
        {
            return Ok(_functions.getFunctions());
        }

        [HttpPost]        
        public ActionResult CreateFunction([FromBody] CreateHzFunction request)
        {
            return Ok(_functions.createFunction(request));
        }
    }
}