import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { ProjectUser } from "src/app/core/models/project-user";
import { User } from "src/app/core/models/user";
import { ProjectViewStateService } from "../project-view-state/project-view-state.service";

@Injectable({
  providedIn: "root",
})
export class ProjectUserService {
  constructor(
    private http: HttpClient,
    private state: ProjectViewStateService
  ) {}

  getUsers(): Observable<User[]> {
    return this.http.get("api/users").pipe(
      map((resp) => {
        return resp as User[];
      })
    );
  }

  addUser(userId: number, projectId: number, role: string) {
    return this.http
      .post(`api/projects/${projectId}/users`, { userId, role })
      .pipe(
        tap((resp: ProjectUser) => {
          this.state.addUser(resp);
        })
      );
  }

  removeUser(userId: number, projectId: number) {
    return this.http.delete(`api/projects/${projectId}/users/${userId}`).pipe(
      tap(() => {
        this.state.removeUser(userId);
      })
    );
  }
}
