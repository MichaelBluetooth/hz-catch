import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Project } from "src/app/core/models/project";
import { ProjectCreateService } from "../../services/project-create/project-create.service";

@Component({
  selector: "app-project-create",
  templateUrl: "./project-create.component.html",
  styleUrls: ["./project-create.component.css"],
})
export class ProjectCreateComponent implements OnInit {
  projectForm = new FormGroup({
    projectName: new FormControl("", Validators.required),
    projectCode: new FormControl("", Validators.required),
    description: new FormControl(""),
    address: new FormControl(""),
  });
  project: Project;

  constructor(
    private router: Router,
    private projects: ProjectCreateService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.data.subscribe((data) => {
      this.project = data.project;
      if (this.project) {
        this.projectForm.controls.projectName.setValue(
          this.project.projectName
        );
        this.projectForm.controls.projectCode.setValue(
          this.project.projectCode
        );
        this.projectForm.controls.address.setValue(this.project.address);
        this.projectForm.controls.description.setValue(
          this.project.description
        );
        this.projectForm.updateValueAndValidity({ emitEvent: false });
      }
    });
  }

  submit() {
    if (this.projectForm.valid) {
      if (this.project) {
        this.projects
          .editProject(this.project.id, this.projectForm.value)
          .subscribe((resp: any) => {
            this.router.navigate(["/projects", resp.id]);
          });
      } else {
        this.projects
          .createProject(this.projectForm.value)
          .subscribe((resp: any) => {
            this.router.navigate(["/projects", resp.id]);
          });
      }
    }
  }
}
