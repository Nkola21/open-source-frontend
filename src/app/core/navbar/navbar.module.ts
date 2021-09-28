import { CommonModule } from '@angular/common';
import { NgModule,ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { NavbarComponent } from './navbar.component';

// const NavbarComponentRouting: ModuleWithProviders<NavbarModule> = RouterModule.forChild([
//   {
//     path:'login',
//     pathMatch: 'full',
//     component: NavbarComponent,
//     canActivate: []
//   },
 
// ]);


@NgModule({
  declarations: [
    NavbarComponent,
  ], 
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
    // NavbarComponentRouting
    
  ],
  exports:[
    NavbarComponent,
  ],
  providers: [],
  bootstrap: []
})
export class NavbarModule { }
