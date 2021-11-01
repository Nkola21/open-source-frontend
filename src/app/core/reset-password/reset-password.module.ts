import { CommonModule } from '@angular/common';
import { NgModule,ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { ResetPasswordComponent } from './reset-password.component';
import { SharedModule } from 'src/app/shared/shared.module';


const ResetPasswordRouting: ModuleWithProviders<ResetPasswordModule> = RouterModule.forChild([
  {
    path:'reset-password',
    pathMatch: 'full',
    component: ResetPasswordComponent,
    canActivate: []
  },
 
]);


@NgModule({
  declarations: [
    ResetPasswordComponent,
  ], 
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    ResetPasswordRouting
    
  ],
  exports:[
    ResetPasswordComponent,
  ],
  providers: [],
  bootstrap: []
})
export class ResetPasswordModule { }
