import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateFunctionComponent } from "./components/create-function/create-function.component";
import { HzFunctionListComponent } from "./components/hz-function-list/hz-function-list.component";
import { HzFunctionListResolver } from "./resolvers/hz-function-list.resolver";

const routes: Routes = [
  {
    path: "create",
    component: CreateFunctionComponent,    
  },
  {
    path: "",
    component: HzFunctionListComponent,
    resolve: {
      functions: HzFunctionListResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HzFunctionsRoutingModule {}
