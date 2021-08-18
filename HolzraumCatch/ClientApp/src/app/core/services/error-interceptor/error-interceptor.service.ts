import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertService } from "../alert/alert.service";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class ErrorInterceptorService {
  constructor(
    private alertController: AlertService,
    private auth: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.alertController.removeAlert();

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.auth.logout();
          } else if (
            err.status === 400 ||
            err.status === 500 ||
            err.status === 403
          ) {
            this.alertController.createAlert(err.error, "danger", 10000);
          }
        }
        return throwError(err);
      })
    );
  }
}
