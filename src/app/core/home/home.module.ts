import { NgModule,ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { HomeComponent } from '../home/home.component';

const HomeRouting: ModuleWithProviders<HomeModule> = RouterModule.forChild([
  {
    path:'home',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: []
  },
 
]);


@NgModule({
  declarations: [
   
    HomeComponent,
  ], 
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    HomeRouting
    
  ],
  exports:[
    HomeComponent
  ],
  providers: [],
  bootstrap: []
})
export class HomeModule { }
