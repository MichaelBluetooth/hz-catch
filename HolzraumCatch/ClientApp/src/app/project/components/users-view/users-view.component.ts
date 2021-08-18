import { Component, Input, OnInit } from "@angular/core";
import { Project } from "src/app/core/models/project";
import { ProjectUser } from "src/app/core/models/project-user";
import { ProjectUserService } from "../../services/project-user/project-user.service";

@Component({
  selector: "app-users-view",
  templateUrl: "./users-view.component.html",
  styleUrls: ["./users-view.component.css"],
})
export class UsersViewComponent implements OnInit {
  @Input() project: Project;

  showAddUser = false;
  showEditUser = false;
  currentUser = null;
  

  constructor(private projectUsers: ProjectUserService) {}

  ngOnInit(): void {}

  removeUser(userId: number){
    this.projectUsers.removeUser(userId, this.project.id).subscribe();
  }

  editUserOpen(projectUser: ProjectUser){
    this.currentUser = projectUser;
    this.showEditUser = true;
  }
}
