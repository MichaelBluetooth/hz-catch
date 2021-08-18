using System;
using System.Collections.Generic;
using System.Linq;
using HolzraumCatch.Models;
using HolzraumCatch.Services.CurrentUser;
using HolzraumCatch.Services.Import;
using Microsoft.EntityFrameworkCore;

namespace HolzraumCatch.Services.ProjectMgt
{
    public class ProjectService : IProjectService
    {
        private readonly AppDbContext _ctx;
        private readonly ICurrentUserService _currentUserSvc;

        public ProjectService(AppDbContext ctx, ICurrentUserService currentUserService)
        {
            _ctx = ctx;
            _currentUserSvc = currentUserService;
        }

        public ProjectDTO createProject(CreateProjectRequest req)
        {
            Project created = _ctx.Projects.Add(new Project()
            {
                projectName = req.projectName,
                projectCode = req.projectCode,
                description = req.description,
                address = req.address,
                created = DateTime.UtcNow,
                lastUpdated = DateTime.UtcNow
            }).Entity;

            _ctx.ProjectUsers.Add(new ProjectUser()
            {
                projectId = created.id,
                userId = _currentUserSvc.CurrentUser.id,
                role = ProjectUser.ProjectUserRoles.OWNER,
                created = DateTime.UtcNow,
                lastUpdated = DateTime.UtcNow
            });

            _ctx.SaveChanges();

            return new ProjectDTO()
            {
                id = created.id,
                projectCode = created.projectCode,
                projectName = created.projectName,
                description = created.description,
                address = created.address
            };
        }

        public ProjectDTO editProject(int id, CreateProjectRequest req){
            Project existing = _ctx.Projects.FirstOrDefault(p => p.id == id);

            existing.projectName = req.projectName;
            existing.projectCode = req.projectCode;
            existing.address = req.address;
            existing.description = req.description;
            existing.lastUpdated = DateTime.UtcNow;

            _ctx.Projects.Update(existing);
            _ctx.SaveChanges();

            return new ProjectDTO()
            {
                id = existing.id,
                projectCode = existing.projectCode,
                projectName = existing.projectName,
                description = existing.description,
                address = existing.address
            };
        }

        public ProjectDTO getProject(int id)
        {
            Project found = _ctx.Projects.FirstOrDefault(p => p.id == id);
            return found != null ? new ProjectDTO()
            {
                id = found.id,
                projectCode = found.projectCode,
                projectName = found.projectName,
                description = found.description,
                address = found.address,
                created = found.created,
                lastUpdated = found.lastUpdated
            } : null;
        }

        public ProjectUserSummary addUser(int projectId, int userId, string role)
        {
            ProjectUser pu = _ctx.ProjectUsers.FirstOrDefault(pu => pu.projectId == projectId && pu.userId == userId);
            if (null == pu)
            {
                pu = _ctx.ProjectUsers.Add(new ProjectUser()
                {
                    projectId = projectId,
                    userId = userId,
                    role = role,
                    created = DateTime.UtcNow,
                    lastUpdated = DateTime.UtcNow
                }).Entity;
                _ctx.SaveChanges();
            }
            else if (pu.role != role)
            {
                pu.role = role;
                pu.lastUpdated = DateTime.UtcNow;
                _ctx.ProjectUsers.Update(pu);
                _ctx.SaveChanges();
            }

            return new ProjectUserSummary()
            {
                userId = pu.userId,
                username = _ctx.Users.Find(userId).username,
                created = pu.created,
                lastUpdated = pu.lastUpdated,
                role = pu.role
            };
        }

        public void removeUser(int projectId, int userId)
        {
            ProjectUser pu = _ctx.ProjectUsers.FirstOrDefault(pu => pu.projectId == projectId && pu.userId == userId);
            if (null != pu)
            {
                _ctx.ProjectUsers.Remove(pu);
                _ctx.SaveChanges();
            }
        }

        public ProjectSummary getProjectSummary(int projectId)
        {
            Project project = _ctx.Projects
                .Include(p => p.projectUsers)
                    .ThenInclude(pu => pu.user)
                .FirstOrDefault(p => p.id == projectId);

            ICollection<ModelData> activeModel = (from model in _ctx.ModelData
                                                  join import in _ctx.ImportJobs on model.importJobId equals import.id
                                                  where import.isActive && import.projectId == projectId
                                                  select model).ToList();

            ProjectSummary summary = new ProjectSummary()
            {
                id = project.id,
                projectName = project.projectName,
                projectCode = project.projectCode,
                created = project.created,
                lastUpdated = project.lastUpdated,
                address = project.address,
                description = project.description,
                slices = activeModel.Where(m => !String.IsNullOrEmpty(m.sub_group)).GroupBy(m => m.sub_group).Select(g => new ModelSummary()
                {
                    label = g.Key,
                    count = g.Select(m => m.sub_group).Distinct().Count()
                }).ToList(),
                materials = activeModel.Where(m => !String.IsNullOrEmpty(m.material)).GroupBy(m => m.material).Select(g => new ModelSummary()
                {
                    label = g.Key,
                    count = g.Select(m => m.material).Distinct().Count()
                }).ToList(),
                panels = activeModel.Where(m => !String.IsNullOrEmpty(m.group)).GroupBy(m => m.group).Select(g => new ModelSummary()
                {
                    label = g.Key,
                    count = g.Select(m => m.group).Distinct().Count()
                }).ToList(),
                functions = activeModel.Where(m => !String.IsNullOrEmpty(m.function_name)).GroupBy(m => m.function_name).Select(g => new ModelSummary()
                {
                    label = g.Key,
                    count = g.Select(m => m.function_name).Distinct().Count()
                }).ToList(),
                scopes = activeModel.Where(m => !String.IsNullOrEmpty(m.comment)).GroupBy(m => m.comment).Select(g => new ModelSummary()
                {
                    label = g.Key,
                    count = g.Select(m => m.comment).Distinct().Count()
                }).ToList(),
                projectUsers = project.projectUsers.Select(pu => new ProjectUserSummary()
                {
                    userId = pu.userId,
                    username = pu.user.username,
                    created = pu.created,
                    lastUpdated = pu.lastUpdated,
                    role = pu.role
                }).ToList(),
                imports = _ctx.ImportJobs.Where(i => i.projectId == projectId).Select(i => new ImportSummary()
                {
                    importId = i.id,
                    projectPhase = i.projectPhase,
                    runDate = i.runDate,
                    fileName = i.fileName,
                    isActive = i.isActive
                }).ToList()
            };

            return summary;
        }

        public ProjectSummary activateImport(int projectId, int importId)
        {
            foreach (ImportJob job in _ctx.ImportJobs.Where(i => i.projectId == projectId).ToList())
            {
                job.isActive = job.id == importId;
                _ctx.ImportJobs.Update(job);
            }
            _ctx.SaveChanges();

            return this.getProjectSummary(projectId);
        }
    }
}
