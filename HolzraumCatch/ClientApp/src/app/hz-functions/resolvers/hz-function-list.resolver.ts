import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { HzFunction } from "src/app/core/models/hz-function";
import { HzFunctionService } from "../services/hz-function.service";

@Injectable({
  providedIn: "root",
})
export class HzFunctionListResolver implements Resolve<HzFunction[]> {
  constructor(private functions: HzFunctionService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<HzFunction[]> {
    return this.functions.getFunctions();
  }
}
