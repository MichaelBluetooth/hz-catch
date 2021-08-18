import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HzFunctionsRoutingModule } from './hz-functions-routing.module';
import { HzFunctionListComponent } from './components/hz-function-list/hz-function-list.component';
import { CreateFunctionComponent } from './components/create-function/create-function.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HzFunctionListComponent,
    CreateFunctionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HzFunctionsRoutingModule
  ]
})
export class HzFunctionsModule { }
