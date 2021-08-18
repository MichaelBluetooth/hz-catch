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
import { ImportJob } from "src/app/core/models/import-job";

@Injectable({
  providedIn: "root",
})
export class ImportResolver implements Resolve<ImportJob> {
  constructor(private http: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ImportJob> {
    return this.http
      .get(`api/importjobs/${route.params["id"]}`)
      .pipe(map((resp) => resp as ImportJob));
  }
}
