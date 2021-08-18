import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProjectUser } from "src/app/core/models/project-user";
import { User } from "src/app/core/models/user";
import { ProjectUserService } from "../../services/project-user/project-user.service";

@Component({
  selector: "app-add-user-modal",
  templateUrl: "./add-user-modal.component.html",
  styleUrls: ["./add-user-modal.component.css"],
})
export class AddUserModalComponent implements OnInit {
  @Input() projectId: number;
  @Input() existingUsers: ProjectUser[] = [];
  @Output() modalClosed = new EventEmitter<boolean>();

  addAnother = false;
  users: User[] = [];
  userForm = new FormGroup({
    user: new FormControl(null, Validators.required),
    role: new FormControl("contributor", Validators.required),
  });

  constructor(private projectUserService: ProjectUserService) {}

  ngOnInit(): void {
    this.userForm.controls.role.setValue('contributor');
    this.projectUserService.getUsers().subscribe((users) => {
      this.users = users.filter((u) => {
        return !this.existingUsers.map((u) => u.userId).includes(u.id);
      });

      if (this.users.length > 0) {
        this.userForm.controls.user.setValue(this.users[0].id);
      }
    });
  }

  submit() {
    if (this.userForm.valid) {
      this.projectUserService.addUser(this.userForm.value.user, this.projectId, this.userForm.value.role).subscribe(() => {
        if (!this.addAnother) {
          this.modalClosed.emit(true);
        }else{
          this.userForm.reset();
          this.ngOnInit();
        }
      });
    }
  }
}
