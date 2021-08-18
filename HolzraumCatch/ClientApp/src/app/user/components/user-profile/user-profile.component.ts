import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "src/app/core/services/alert/alert.service";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { ConfirmService } from "src/app/core/services/confirm/confirm.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  user: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private confirmController: ConfirmService,
    private alertController: AlertService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((d) => {
      this.user = d.user;
    });
  }

  clearPreferences() {
    this.confirmController
      .confirm(
        "Confirm",
        "Are you sure you want to clear preferences? This action cannot be undone."
      )
      .subscribe((confirmed) => {
        if (confirmed) {
          this.alertController.createAlert(
            "Preferences cleared",
            "success",
            4000
          );

          Object.keys(localStorage).forEach((key: string) => {
            if (!this.auth.SPECIAL_KEYS.includes(key)) {
              localStorage.removeItem(key);
            }
          });
        }
      });
  }
}
