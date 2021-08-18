using System;
using System.Linq;
using HolzraumCatch.Models;
using Microsoft.AspNetCore.Http;

namespace HolzraumCatch.Services.CurrentUser
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpAccess;
        private readonly AppDbContext _context;

        public CurrentUserService(AppDbContext context, IHttpContextAccessor httpAccess)
        {
            _httpAccess = httpAccess;
            _context = context;
        }

        public User CurrentUser
        {
            get
            {
                return _context.Users.FirstOrDefault(u =>
                    u.username.Equals(_httpAccess.HttpContext.User.Identity.Name, StringComparison.CurrentCultureIgnoreCase));
            }
        }
    }
}