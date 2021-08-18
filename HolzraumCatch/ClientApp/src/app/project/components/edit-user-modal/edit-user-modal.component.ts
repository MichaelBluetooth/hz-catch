import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ProjectUser } from "src/app/core/models/project-user";
import { ProjectUserService } from "../../services/project-user/project-user.service";

@Component({
  selector: "app-edit-user-modal",
  templateUrl: "./edit-user-modal.component.html",
  styleUrls: ["./edit-user-modal.component.css"],
})
export class EditUserModalComponent implements OnInit {
  @Input() user: ProjectUser;
  @Input() projectId: number;
  @Output() modalClosed = new EventEmitter<boolean>();

  newRole: string;

  constructor(private projectUsers: ProjectUserService) {}

  ngOnInit(): void {
    this.newRole = this.user.role;
  }

  submit() {
    this.projectUsers.addUser(this.user.userId, this.projectId, this.newRole).subscribe(() => {
      this.modalClosed.emit(true);
    });
  }
}
