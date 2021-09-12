import { CommonModule } from '@angular/common';
import { NgModule,ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './contact.component';

const ContactRouting: ModuleWithProviders<ContactModule> = RouterModule.forChild([
  {

    path:'contacts',
    pathMatch: 'full',
    component: ContactComponent,
    canActivate: []
  },
 
]);


@NgModule({
  declarations: [
    ContactComponent,

  ], 
  imports: [
    CommonModule,
    BrowserModule,
    ContactRouting
    
  ],
  exports:[
    ContactComponent,
  ],
  providers: [],
  bootstrap: []
})
export class ContactModule { }
