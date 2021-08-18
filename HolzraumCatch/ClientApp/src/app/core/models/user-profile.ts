import { UserProjectSummary } from "./user-project-summary";
import { UserSummary } from "./user-summary";

export interface UserProfile extends UserSummary {
    projects: UserProjectSummary[]
}
