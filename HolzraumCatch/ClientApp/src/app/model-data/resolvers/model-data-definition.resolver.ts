import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ModelDataDefinition } from "src/app/core/models/model-data-definition";

@Injectable({
  providedIn: "root",
})
export class ModelDataDefinitionResolver
  implements Resolve<ModelDataDefinition>
{
  constructor(private http: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ModelDataDefinition> {
    return this.http
      .get("api/modeldata/definition")
      .pipe(map((resp) => resp as ModelDataDefinition))
      .pipe(
        map((definition) => {
          definition.properties = definition.properties.sort((p1, p2) => {
            return p1.order >= p2.order ? 1 : -1;
          });
          return definition;
        })
      );
  }
}
