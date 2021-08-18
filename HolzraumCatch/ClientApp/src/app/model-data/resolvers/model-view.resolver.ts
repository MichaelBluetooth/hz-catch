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
import { ModelDataView } from "src/app/core/models/model-data-view";

@Injectable({
  providedIn: "root",
})
export class ModelViewResolver implements Resolve<ModelDataView> {
  constructor(private http: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ModelDataView> {
    return this.http
      .get(`api/modeldata/${route.params["id"]}`)
      .pipe(map((resp) => resp as ModelDataView));
  }
}
