import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputErrorComponent } from './components/input-error/input-error.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
      InputErrorComponent
    ],
  exports: [
    InputErrorComponent
  ]
})
export class SharedModule { }
