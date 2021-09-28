import { CommonModule } from '@angular/common';
import { NgModule,ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ServicesComponent } from './services.component';

const ServicesRouting: ModuleWithProviders<ServicesModule> = RouterModule.forChild([
  {
    path:'services',
    pathMatch: 'full',
    component: ServicesComponent,
    canActivate: []
  },
 
]);


@NgModule({
  declarations: [
    ServicesComponent,
  ], 
  imports: [
    CommonModule,
    BrowserModule,
    ServicesRouting
    
  ],
  exports:[
    ServicesComponent,
  ],
  providers: [],
  bootstrap: []
})
export class ServicesModule { }
