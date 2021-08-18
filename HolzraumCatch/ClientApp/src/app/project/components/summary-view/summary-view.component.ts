import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { Project } from "src/app/core/models/project";

@Component({
  selector: "app-summary-view",
  templateUrl: "./summary-view.component.html",
  styleUrls: ["./summary-view.component.css"],
})
export class SummaryViewComponent implements OnChanges {
  @Input() project: Project;
  scopesExpanded = true;
  slicesExpanded = true;
  functionsExpanded = true;
  materialsExpanded = true;

  constructor() {}

  ngOnChanges(): void {
    this.scopesExpanded = JSON.parse(localStorage.getItem('scopesExpanded')) ?? true;
    this.slicesExpanded = JSON.parse(localStorage.getItem('slicesExpanded')) ?? true;
    this.functionsExpanded = JSON.parse(localStorage.getItem('functionsExpanded')) ?? true;
    this.materialsExpanded = JSON.parse(localStorage.getItem('materialsExpanded')) ?? true;
  }

  toggleScopes(){
    this.scopesExpanded = !this.scopesExpanded;
    localStorage.setItem('scopesExpanded', JSON.stringify(this.scopesExpanded));
  }

  toggleSlices(){
    this.slicesExpanded = !this.slicesExpanded;
    localStorage.setItem('slicesExpanded', JSON.stringify(this.slicesExpanded));
  }

  toggleFunctions(){
    this.functionsExpanded = !this.functionsExpanded;
    localStorage.setItem('functionsExpanded', JSON.stringify(this.functionsExpanded));
  }

  toggleMaterials(){
    this.materialsExpanded = !this.materialsExpanded;
    localStorage.setItem('materialsExpanded', JSON.stringify(this.materialsExpanded));
  }
}
