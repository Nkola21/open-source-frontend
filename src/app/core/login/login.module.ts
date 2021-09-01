import { CommonModule } from '@angular/common';
import { NgModule,ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
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
    LoginRouting
    
  ],
  exports:[
    LoginComponent,
  ],
  providers: [],
  bootstrap: []
})
export class LoginModule { }
