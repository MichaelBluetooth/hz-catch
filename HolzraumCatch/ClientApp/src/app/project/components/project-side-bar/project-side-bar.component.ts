import { Component, Input } from "@angular/core";
import { Project } from "src/app/core/models/project";

@Component({
  selector: "app-project-side-bar",
  templateUrl: "./project-side-bar.component.html",
  styleUrls: ["./project-side-bar.component.css"],
})
export class ProjectSideBarComponent {
  @Input() project: Project;
}
