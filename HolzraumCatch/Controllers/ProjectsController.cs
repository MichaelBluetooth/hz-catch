using HolzraumCatch.Models;
using HolzraumCatch.Services.Import;
using HolzraumCatch.Services.ProjectMgt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace HolzraumCatch.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;
        private readonly IProjectDataImportService _importService;
        private readonly ILogger<ProjectsController> _logger;

        public ProjectsController(ILogger<ProjectsController> logger, IProjectService projectService, IProjectDataImportService importService)
        {
            _logger = logger;
            _projectService = projectService;
            _importService = importService;
        }

        [HttpPost]
        public ActionResult Create([FromBody] CreateProjectRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            ProjectDTO created = _projectService.createProject(request);
            return Ok(created);
        }

        [HttpPut]
        [Route("{id}")]
        public ActionResult Edit([FromRoute] int id, [FromBody] CreateProjectRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            ProjectDTO created = _projectService.editProject(id, request);
            return Ok(created);
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult GetById([FromRoute] int id)
        {
            ProjectSummary proj = _projectService.getProjectSummary(id);
            if (null == proj)
            {
                return NotFound();
            }

            //TODO: what happens when a user who is not a member of project attempts to get proj by id?
            //   Bad Request?
            //   Not Found?       <--- probably this
            //   Not authorized?

            return Ok(proj);
        }

        [HttpPost]
        [Route("{id}/import")]
        public ActionResult Import([FromRoute] int id, [FromBody] ImportRequest request)
        {
            ImportSummary job = _importService.import(id, request);
            return Ok(job);
        }

        [HttpPost]
        [Route("{id}/activate")]
        public ActionResult ActivateImport([FromRoute] int id, [FromBody] ActivateImportRequest request)
        {
            ProjectSummary summary = _projectService.activateImport(id, request.importId);
            return Ok(summary);
        }

        [HttpPost]
        [Route("{id}/users")]
        public ActionResult AddProjectUser([FromRoute] int id, [FromBody] ProjectUserRequest req)
        {
            ProjectUserSummary user = _projectService.addUser(id, req.userId, req.role);
            return Ok(user);
        }

        [HttpDelete]
        [Route("{id}/users/{userId}")]
        public ActionResult RemoveProjectUser([FromRoute] int id, [FromRoute] int userId)
        {
            _projectService.removeUser(id, userId);
            return NoContent();
        }
    }
}