using HolzraumCatch.Models;

namespace HolzraumCatch.Services.CurrentUser
{
    public interface ICurrentUserService
    {
        User CurrentUser { get; }
    }
}