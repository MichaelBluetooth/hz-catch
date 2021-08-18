using System.Collections.Generic;

namespace HolzraumCatch.Services.UserUtils
{
    public interface IUserDetailsService {
        UserProfile getUser(int userId);
        UserProfile getCurrentUser();
        ICollection<UserSummary> getUsers();
        UserProfile updateUser(int userId, UpdateUserRequest request);
    }
}