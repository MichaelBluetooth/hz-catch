import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Project } from "src/app/core/models/project";
import { ProjectViewStateService } from "../../services/project-view-state/project-view-state.service";

@Injectable({
  providedIn: "root",
})
export class ProjectResolver {
  constructor(private http: HttpClient, private state: ProjectViewStateService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Project> {
    return this.http.get(`api/projects/${route.params["id"]}`).pipe(
      map((resp: any) => {
        this.state.setProject(resp);
        return resp as Project;
      })
    );
  }
}
