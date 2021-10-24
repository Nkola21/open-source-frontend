import { CommonModule } from '@angular/common';
import { NgModule,ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
//import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';
import { TermsandconditionsComponent } from './termsandconditions.component';

const TermsandconditionsRouting: ModuleWithProviders<TermsandconditionsModule> = RouterModule.forChild([
  {
    path:'termsandconditions',
    pathMatch: 'full',
    component:  TermsandconditionsComponent ,
    canActivate: []
  },
 
]);


@NgModule({
  declarations: [
    TermsandconditionsComponent ,
  ], 
  imports: [
    CommonModule,
    BrowserModule,
 
    ReactiveFormsModule,
    TermsandconditionsRouting
    
  ],
  exports:[
    TermsandconditionsComponent,
  ],
  providers: [],
  bootstrap: []
})
export class TermsandconditionsModule { }
