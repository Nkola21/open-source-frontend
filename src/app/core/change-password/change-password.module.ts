import { CommonModule } from '@angular/common';
import { NgModule,ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { ChangePasswordComponent } from './change-password.component';

const ChangePasswordRouting: ModuleWithProviders<ChangePasswordModule> = RouterModule.forChild([
  {
    path:'change-password',
    pathMatch: 'full',
    component: ChangePasswordComponent,
    canActivate: []
  },
 
]);


@NgModule({
  declarations: [
    ChangePasswordComponent,
  ], 
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    ChangePasswordRouting
    
  ],
  exports:[
    ChangePasswordComponent,
  ],
  providers: [],
  bootstrap: []
})
export class ChangePasswordModule { }
