import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ImportJob } from "src/app/core/models/import-job";
import { Project } from "src/app/core/models/project";
import { ProjectUser } from "src/app/core/models/project-user";

@Injectable({
  providedIn: "root",
})
export class ProjectViewStateService {
  private _project = new BehaviorSubject<Project>(null);

  get project$() {
    return this._project.asObservable();
  }

  constructor(private http: HttpClient) {}

  setProject(project: Project): void {
    this._project.next(project);
  }

  addUser(user: ProjectUser) {
    const currentProject = this._project.value;
    const idx = currentProject.projectUsers.findIndex(
      (u) => u.userId == user.userId
    );
    if (idx === -1) {
      currentProject.projectUsers.push(user);
    } else {
      currentProject.projectUsers[idx] = user;
    }
    this._project.next(currentProject);
  }

  removeUser(userId: number) {
    const currentProject = this._project.value;
    const idx = currentProject.projectUsers.findIndex(
      (u) => u.userId == userId
    );
    if (idx > -1) {
      currentProject.projectUsers.splice(idx, 1);
    }
    this._project.next(currentProject);
  }

  addImport(importJob: ImportJob) {
    const currentProject = this._project.value;
    const firstImport = currentProject.imports.length === 0;
    currentProject.imports.push(importJob);
    this._project.next(currentProject);
    if (firstImport) {
      this.refresh();
    }
  }

  refresh() {
    this.http
      .get(`api/projects/${this._project.value.id}`)
      .subscribe((resp: Project) => {
        this.setProject(resp);
      });
  }
}
