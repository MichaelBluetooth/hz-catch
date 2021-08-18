import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { ProfileResolver } from "./resolvers/profile/profile.resolver";
import { UserListResolver } from "./resolvers/user-list/user-list.resolver";
import { UserResolver } from "./resolvers/user/user.resolver";

const routes: Routes = [
  {
    path: "",
    component: UserListComponent,
    resolve: {
      users: UserListResolver,
    },
  },
  {
    path: "profile",
    component: UserProfileComponent,
    resolve: {
      user: ProfileResolver,
    }
  },
  {
    path: "profile/edit",
    component: UserEditComponent,
    resolve: {
      user: ProfileResolver,
    }
  },
  {
    path: ":id",
    component: UserProfileComponent,
    resolve: {
      user: UserResolver,
    }
  },
  {
    path: ":id/edit",
    component: UserEditComponent,
    resolve: {
      user: UserResolver,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
