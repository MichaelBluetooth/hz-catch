namespace HolzraumCatch.Services.ProjectMgt
{
    public interface IProjectService
    {
        ProjectDTO createProject(CreateProjectRequest req);
        ProjectDTO editProject(int id, CreateProjectRequest req);
        ProjectDTO getProject(int id);
        ProjectUserSummary addUser(int projectId, int userId, string role);
        void removeUser(int projectId, int userId);
        ProjectSummary getProjectSummary(int projectId);
        ProjectSummary activateImport(int projectId, int importId);
    }
}
