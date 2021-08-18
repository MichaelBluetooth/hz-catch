import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelDataViewComponent } from './components/model-data-view/model-data-view.component';
import { ModelViewResolver } from './resolvers/model-view.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: ModelDataViewComponent,
    resolve: {
      view: ModelViewResolver,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelDataRoutingModule { }
