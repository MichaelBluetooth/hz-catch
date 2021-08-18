import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ProjectCreateService {
  constructor(private http: HttpClient) {}

  createProject(project: any) {
    return this.http.post("api/projects", project);
  }

  editProject(id: number, project: any) {
    return this.http.put(`api/projects/${id}`, project);
  }
}
