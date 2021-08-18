import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AccordionModule, TabsModule } from "ngx-bootstrap";
import { CoreModule } from "./core/core.module";
import { AuthInterceptorService } from "./core/services/auth-interceptor/auth.interceptor";
import { AuthGuard } from "./core/guards/auth.guard";
import { ErrorInterceptorService } from "./core/services/error-interceptor/error-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(
      [
        {
          path: "login",
          loadChildren: () =>
            import("./login/login.module").then((m) => m.LoginModule),
        },
        {
          path: "users",
          canActivate: [AuthGuard],
          loadChildren: () =>
            import("./user/user.module").then((m) => m.UserModule),
        },
        {
          path: "projects",
          canActivate: [AuthGuard],
          loadChildren: () =>
            import("./project/project.module").then((m) => m.ProjectModule),
        },
        {
          path: "functions",
          canActivate: [AuthGuard],
          loadChildren: () =>
            import("./hz-functions/hz-functions.module").then(
              (m) => m.HzFunctionsModule
            ),
        },
        {
          path: "model-data",
          canActivate: [AuthGuard],
          loadChildren: () =>
            import("./model-data/model-data.module").then(
              (m) => m.ModelDataModule
            ),
        },
        {
          path: "",
          pathMatch: "full",
          redirectTo: "/users/profile",
        },
      ],
      { relativeLinkResolution: "legacy" }
    ),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
