import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, filter, switchMap, take } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private auth: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.includes("login")) {
      request = this.addAuthenticationToken(request);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (
          request.url.includes("refresh-token") ||
          request.url.includes("login")
        ) {
          if (request.url.includes("refresh-token")) {
            this.refreshTokenInProgress = false;
            this.router.navigate(["/login"]);
            this.auth.logout();
          }

          return throwError(error);
        }

        if (error.status !== 401) {
          return throwError(error);
        }

        if (this.refreshTokenInProgress) {
          return this.refreshTokenSubject
            .pipe(filter((result) => result !== null))
            .pipe(take(1))
            .pipe(
              switchMap(() => next.handle(this.addAuthenticationToken(request)))
            );
        } else {
          this.refreshTokenInProgress = true;

          this.refreshTokenSubject.next(null);

          return this.auth
            .refreshAccessToken()
            .pipe(
              switchMap((token) => {
                this.refreshTokenInProgress = false;
                this.refreshTokenSubject.next(token);
                return next.handle(this.addAuthenticationToken(request));
              })
            )
            .pipe(
              catchError((err) => {
                this.refreshTokenInProgress = false;
                this.auth.logout();
                return throwError(err);
              })
            );
        }
      })
    );
  }

  addAuthenticationToken(request) {
    const accessToken = this.auth.getAccessToken();
    if (!accessToken) {
      return request;
    }
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getAccessToken()}`,
      },
    });
  }
}
