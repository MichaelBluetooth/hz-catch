import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { UserSummary } from "src/app/core/models/user-summary";
import { AlertService } from "src/app/core/services/alert/alert.service";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { ProfileService } from "../../services/profile/profile.service";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.css"],
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  changePassword: FormGroup;
  user: UserSummary;
  waiting = false;

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private users: ProfileService,
    private auth: AuthService,
    private alertController: AlertService
  ) {}

  ngOnInit(): void {
    this.activeRoute.data.subscribe((d) => {
      this.user = d.user;
      this.initForms();
    });
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get("password").value;
    let confirmPass = group.get("confirmPassword").value;
    if (!pass && !confirmPass) {
      return null;
    } else {
      return pass === confirmPass ? null : { notSame: true };
    }
  };

  lowercaseValidator(c: FormControl) {
    let regex = /[A-Z]/g;
    if (regex.test(c.value)) {
      return null;
    } else {
      return { missingUppercase: true };
    }
  }

  submit() {
    this.waiting = true;
    if (this.userForm.valid) {
      const newPassword = this.changePassword.valid
        ? this.changePassword.value.password
        : null;
      this.users
        .updateUser(
          this.user.id,
          this.userForm.value.username ?? this.user.username,
          this.userForm.value.email,
          newPassword
        )
        .subscribe((updated: UserSummary) => {
          this.alertController.createAlert('Changes saved', 'success', 4000);
          this.waiting = false;
          this.user = updated;
          this.initForms();
        });
    }
  }

  initForms() {
    this.userForm = this.fb.group({
      username: new FormControl(this.user.username, [Validators.required]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
      ]),
    });

    if (this.auth.currentUsername() === this.user.username) {
      this.userForm.controls.username.disable();
    }

    this.changePassword = this.fb.group(
      {
        password: new FormControl("", [
          Validators.minLength(8),
          this.lowercaseValidator,
        ]),
        confirmPassword: new FormControl("", [Validators.required]),
      },
      { validators: this.checkPasswords }
    );

    this.changePassword.controls.password.valueChanges.subscribe((newValue) => {
      if(!newValue){
        this.changePassword.controls.password.setErrors(null);
        this.changePassword.updateValueAndValidity({emitEvent: false});
      }
    });
  }

  isInvalid(){
    return this.userForm.invalid || (this.changePassword.value.password && this.changePassword.invalid);
  }
}
