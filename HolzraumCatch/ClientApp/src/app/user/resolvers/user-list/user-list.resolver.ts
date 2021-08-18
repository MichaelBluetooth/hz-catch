import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { UserSummary } from "src/app/core/models/user-summary";

@Injectable({
  providedIn: "root",
})
export class UserListResolver implements Resolve<UserSummary[]> {
  constructor(private http: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserSummary[]> {
    return this.http
      .get("api/users")
      .pipe(map((resp) => resp as UserSummary[]));
  }
}
