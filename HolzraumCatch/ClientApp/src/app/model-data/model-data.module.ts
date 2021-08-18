import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridModule } from 'ag-grid-angular';
import { BsDropdownModule } from 'ngx-bootstrap';

import { ModelDataRoutingModule } from './model-data-routing.module';
import { ModelDataViewComponent } from './components/model-data-view/model-data-view.component';
import { ListFilterBtnComponent } from './components/list-filter-btn/list-filter-btn.component';
import { ColumnsBtnComponent } from './components/columns-btn/columns-btn.component';
import { ColumnSortPipe } from './pipes/column-sort.pipe';
import { FilterBtnLabelPipe } from './pipes/filter-btn-label.pipe';
import { FilterOptionsPipe } from './pipes/filter-options.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ModelDataViewComponent,
    ListFilterBtnComponent,
    ColumnsBtnComponent,
    ColumnSortPipe,
    FilterBtnLabelPipe,
    FilterOptionsPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridModule,
    BsDropdownModule.forRoot(),
    ModelDataRoutingModule
  ]
})
export class ModelDataModule { }
