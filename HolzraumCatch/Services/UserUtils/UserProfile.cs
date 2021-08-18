using System.Collections.Generic;

namespace HolzraumCatch.Services.UserUtils {
    public class UserProfile: UserSummary {        
        public ICollection<UserProjectSummary> projects { get; set; }
    }
}