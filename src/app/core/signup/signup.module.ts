import { CommonModule } from '@angular/common';
import { NgModule,ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
import { SharedModule } from 'src/app/shared/shared.module';


const SignupRouting: ModuleWithProviders<SignupModule> = RouterModule.forChild([
  {
    path:'signup',
    pathMatch: 'full',
    component: SignupComponent,
    canActivate: []
  },
 
]);


@NgModule({
  declarations: [
    SignupComponent,
  ], 
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    SignupRouting
    
  ],
  exports:[
    SignupComponent,
  ],
  providers: [],
  bootstrap: []
})
export class SignupModule { }
