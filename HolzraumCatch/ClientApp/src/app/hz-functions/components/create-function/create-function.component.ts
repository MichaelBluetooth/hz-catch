import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HzFunctionService } from "../../services/hz-function.service";

@Component({
  selector: "app-create-function",
  templateUrl: "./create-function.component.html",
  styleUrls: ["./create-function.component.css"],
})
export class CreateFunctionComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
  });

  constructor(private funcs: HzFunctionService, private router: Router) {}

  ngOnInit(): void {}

  submit() {
    if (this.form.valid) {
      this.funcs.createFunction(this.form.value).subscribe(() => {
        this.router.navigate(["/functions"]);
      });
    }
  }
}
