import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectViewComponent } from './components/project-view/project-view.component';
import { ModelSummaryComponent } from './components/model-summary/model-summary.component';
import { SummaryViewComponent } from './components/summary-view/summary-view.component';
import { ImportsViewComponent } from './components/imports-view/imports-view.component';
import { DocumentsViewComponent } from './components/documents-view/documents-view.component';
import { UsersViewComponent } from './components/users-view/users-view.component';
import { ProjectSideBarComponent } from './components/project-side-bar/project-side-bar.component';
import { AccordionModule, BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { CountSummaryPipe } from './pipes/count-summary.pipe';
import { CoreModule } from '../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { AddUserModalComponent } from './components/add-user-modal/add-user-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditUserModalComponent } from './components/edit-user-modal/edit-user-modal.component';
import { ImportModalComponent } from './components/import-modal/import-modal.component';
import { ProjectCreateComponent } from './components/project-create/project-create.component';

@NgModule({
  declarations: [
    ProjectViewComponent,
    ModelSummaryComponent,
    SummaryViewComponent,
    ImportsViewComponent,
    DocumentsViewComponent,
    UsersViewComponent,
    ProjectSideBarComponent,
    CountSummaryPipe,
    AddUserModalComponent,
    EditUserModalComponent,
    ImportModalComponent,
    ProjectCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProjectRoutingModule,
    CoreModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    ChartsModule
  ],
  providers: [
  ]
})
export class ProjectModule { }
