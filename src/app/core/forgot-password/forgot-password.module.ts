import { CommonModule } from '@angular/common';
import { NgModule,ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { SharedModule } from 'src/app/shared/shared.module';

const ForgotPasswordRouting: ModuleWithProviders<ForgotPasswordModule> = RouterModule.forChild([
  {
    path:'forgot-password',
    pathMatch: 'full',
    component: ForgotPasswordComponent,
    canActivate: []
  },
 
]);


@NgModule({
  declarations: [
    ForgotPasswordComponent,
  ], 
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    ForgotPasswordRouting
    
  ],
  exports:[
    ForgotPasswordComponent,
  ],
  providers: [],
  bootstrap: []
})
export class ForgotPasswordModule { }
