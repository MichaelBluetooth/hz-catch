import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectCreateComponent } from './components/project-create/project-create.component';
import { ProjectViewComponent } from './components/project-view/project-view.component';
import { ProjectResolver } from './resolvers/project/project.resolver';

const routes: Routes = [
  {
    path: 'create',
    component: ProjectCreateComponent,
  },
  {
    path: ':id',
    component: ProjectViewComponent,
    resolve: {
      project: ProjectResolver
    }
  },
  {
    path: ':id/edit',
    component: ProjectCreateComponent,
    resolve: {
      project: ProjectResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
