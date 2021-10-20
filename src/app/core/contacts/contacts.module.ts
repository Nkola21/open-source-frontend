import { CommonModule } from '@angular/common';
import { NgModule,ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts.component';

const ContactsRouting: ModuleWithProviders<ContactsModule> = RouterModule.forChild([
  {
    path:'contacts',
    pathMatch: 'full',
    component: ContactsComponent,
    canActivate: []
  },
 
]);


@NgModule({
  declarations: [
    ContactsComponent,
  ], 
  imports: [
    CommonModule,
    BrowserModule,
    ContactsRouting
    
  ],
  exports:[
   ContactsComponent,
  ],
  providers: [],
  bootstrap: []
})
export class ContactsModule { }
