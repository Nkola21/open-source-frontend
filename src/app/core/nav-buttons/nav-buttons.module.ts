import { CommonModule } from '@angular/common';
import { NgModule,ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { NavbuttonsComponent } from './nav-buttons.component';

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
    NavbuttonsComponent,
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
    NavbuttonsComponent,
  ],
  providers: [],
  bootstrap: []
})
export class NavbuttonsModule { }
