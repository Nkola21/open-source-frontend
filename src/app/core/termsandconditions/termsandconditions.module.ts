import { CommonModule } from '@angular/common';
import { NgModule,ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {TermsandconditionsComponent } from './termsandconditions.component';

const TermsandconditionsRouting: ModuleWithProviders<TermsandConditionsModule> = RouterModule.forChild([
  {

    path:'terms-and-conditions',
    pathMatch: 'full',
    component: TermsandconditionsComponent,
    canActivate: []
  },
 
]);


@NgModule({
  declarations: [
    TermsandconditionsComponent,
  ], 
  imports: [
    CommonModule,
    BrowserModule,
    TermsandconditionsRouting
    
  ],
  exports:[
    TermsandconditionsComponent,
  ],
  providers: [],
  bootstrap: []
})
export class TermsandConditionsModule { }
