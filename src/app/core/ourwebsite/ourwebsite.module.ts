import { CommonModule } from '@angular/common';
import { NgModule,ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {OurwebsiteComponent } from './ourwebsite.component';

const OurWebsiteRouting: ModuleWithProviders<OurWebsiteModule> = RouterModule.forChild([
  {

    path:'ourwebsite',
    pathMatch: 'full',
    component: OurwebsiteComponent,
    canActivate: []
  },
 
]);


@NgModule({
  declarations: [
    OurwebsiteComponent,
  ], 
  imports: [
    CommonModule,
    BrowserModule,
    OurWebsiteRouting
    
  ],
  exports:[
    OurwebsiteComponent,
  ],
  providers: [],
  bootstrap: []
})
export class OurWebsiteModule { }
