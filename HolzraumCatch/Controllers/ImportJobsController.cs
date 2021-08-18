using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using HolzraumCatch.Models;
using HolzraumCatch.Services.File;
using HolzraumCatch.Services.Import;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace HolzraumCatch.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ImportJobsController : ControllerBase
    {
        private readonly AppDbContext _ctx;
        private readonly IProjectDataImportService _import;
        private readonly ILogger<ImportJobsController> _logger;

        public ImportJobsController(ILogger<ImportJobsController> logger, AppDbContext ctx, IProjectDataImportService import)
        {
            _logger = logger;
            _ctx = ctx;
            _import = import;
        }

        [HttpGet]
        [Route("{importjobid}/download")]
        public ActionResult Download([FromRoute] int importjobid)
        {
            ImportJob job = _ctx.ImportJobs.Find(importjobid);
            TextReader reader = _import.getImportFile(importjobid);
            byte[] data = Encoding.UTF8.GetBytes(reader.ReadToEnd());
            return File(data, "text/csv", job.fileName);
        }
    }
}