import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { LoginResponse } from "../../models/login-response";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  SPECIAL_KEYS = ["username", "accessToken", "refreshToken", "expiresIn"];
  private _logoutTimer: any;
  private _loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient, private router: Router) {}

  get loggedIn$(): Observable<boolean> {
    return this._loggedIn.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post("api/users/login", { username, password }).pipe(
      tap((resp: LoginResponse) => {
        this.handleLoginResponse(resp);
      })
    );
  }

  logout() {
    this.SPECIAL_KEYS.forEach((key) => {
      localStorage.removeItem(key);
    });
    //todo: remove expiresIn date
    this._loggedIn.next(false);
  }

  handleLoginResponse(resp: LoginResponse) {
    localStorage.setItem("username", resp.username);
    localStorage.setItem("accessToken", resp.accessToken);
    localStorage.setItem("refreshToken", resp.refreshToken);
    let decoded = this.decodeToken(resp.accessToken);
    localStorage.setItem("expiresIn", decoded.exp);
    this._loggedIn.next(true);

    if (this._logoutTimer) {
      clearTimeout(this._logoutTimer);
    }

    let expiresDate = new Date(0);
    expiresDate.setUTCSeconds(decoded.exp);
    let now = new Date();
    this._logoutTimer = setTimeout(() => {
      this.logout();
      this.router.navigate(["/login"]);
    }, (expiresDate.getTime() - now.getTime()) + 300000);
  }

  getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  isLoggedIn() {
    let expiresIn = +localStorage.getItem("expiresIn");
    if (!expiresIn) {
      return false;
    } else {
      let now = new Date();
      let expiresDate = new Date(0);
      expiresDate.setUTCSeconds(expiresIn + 30000);
      return now < expiresDate;
    }
  }

  decodeToken(token: string): any {
    //https://stackoverflow.com/a/38552302/821918
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  }

  currentUsername() {
    return localStorage.getItem("username");
  }

  refreshAccessToken() {
    return this.http
      .post("api/users/refresh-token", {
        refreshToken: localStorage.getItem("refreshToken"),
      })
      .pipe(
        map((resp: LoginResponse) => {
          this.handleLoginResponse(resp);
          return resp.refreshToken;
        })
      );
  }
}
