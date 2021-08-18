using System.Collections.Generic;
using System.Linq;
using HolzraumCatch.Authentication;
using HolzraumCatch.Models;
using HolzraumCatch.Services.CurrentUser;
using Microsoft.EntityFrameworkCore;

namespace HolzraumCatch.Services.UserUtils
{
    public class UserDetailsService : IUserDetailsService
    {
        private readonly AppDbContext _ctx;
        private readonly ICurrentUserService _currentUser;
        private readonly IUserService _userService;

        public UserDetailsService(AppDbContext ctx, ICurrentUserService currentUserService, IUserService userService)
        {
            _ctx = ctx;
            _currentUser = currentUserService;
            _userService = userService;
        }

        public UserProfile getCurrentUser()
        {
            return getUser(_currentUser.CurrentUser.id);
        }

        public UserProfile getUser(int userId)
        {
            Models.User user = _ctx.Users.Find(userId);
            ICollection<ProjectUser> memberships = _ctx.ProjectUsers.Include(pu => pu.project).Where(pu => pu.userId == userId).ToList();

            return new UserProfile()
            {
                id = user.id,
                username = user.username,
                email = user.email,
                projects = memberships.Select(m => new UserProjectSummary()
                {
                    projectId = m.projectId,
                    projectName = m.project.projectName,
                    projectCode = m.project.projectCode,
                    projectPhase = _ctx.ImportJobs.FirstOrDefault(i => i.isActive && i.projectId == m.projectId)?.projectPhase,
                    address = m.project.address,
                    description = m.project.description,
                    created = m.project.created,
                    role = m.role
                }).ToList()
            };
        }

        public ICollection<UserSummary> getUsers()
        {
            return _ctx.Users.ToList().Select(user => new UserSummary()
            {
                id = user.id,
                username = user.username,
                email = user.email,
            }).ToList();
        }

        public UserProfile updateUser(int userId, UpdateUserRequest request)
        {
            User user = _ctx.Users.Find(userId);

            user.username = request.username;
            user.email = request.email;

            if (!string.IsNullOrEmpty(request.password) && _userService.isValidPassword(request.password))
            {
                _userService.setPassword(user, request.password);
            }

            _ctx.SaveChanges();

            return getUser(userId);
        }
    }
}