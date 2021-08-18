import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { ConfirmComponent } from './components/confirm/confirm.component';



@NgModule({
  declarations: [
    AlertComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    // AccordionModule.forRoot(),
    // TabsModule.forRoot()
  ],
  exports: [
    AlertComponent
  ],
  providers: [
  ]
})
export class CoreModule { }
