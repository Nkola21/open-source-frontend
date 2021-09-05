import { CommonModule } from '@angular/common';
import { NgModule,ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NavSignInComponent } from './nav-signin.component';

// const NavSignInComponentRouting: ModuleWithProviders<NavSignInModule> = RouterModule.forChild([
//   {
//     path:'',
//     pathMatch: 'full',
//     component: NavSignInComponent,
//     canActivate: []
//   },
 
// ]);


@NgModule({
  declarations: [
    NavSignInComponent,
  ], 
  imports: [
    CommonModule,
    BrowserModule
    // NavSignInComponentRouting
    
  ],
  exports:[
    NavSignInComponent,
  ],
  providers: [],
  bootstrap: []
})
export class NavSignInModule { }
