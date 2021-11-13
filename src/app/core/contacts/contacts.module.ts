import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule,ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { SharedModule } from 'src/app/shared/shared.module';

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
    SharedModule,
    ReactiveFormsModule,
    ContactsRouting
  ],
  exports:[
   ContactsComponent,
  ],
  providers: [],
  bootstrap: []
})
export class ContactsModule { }
