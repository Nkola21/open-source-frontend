import { CommonModule } from '@angular/common';
import { NgModule,ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { LoginComponent } from './login.component';

const LoginRouting: ModuleWithProviders<LoginModule> = RouterModule.forChild([
  {
    path:'login',
    pathMatch: 'full',
    component: LoginComponent,
    canActivate: []
  },
 
]);


@NgModule({
  declarations: [
    LoginComponent,
  ], 
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    LoginRouting
    
  ],
  exports:[
    LoginComponent,
  ],
  providers: [],
  bootstrap: []
})
export class LoginModule { }
