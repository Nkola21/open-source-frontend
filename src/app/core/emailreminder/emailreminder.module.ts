import { CommonModule } from '@angular/common';
import { NgModule,ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EmailreminderComponent } from './emailreminder.component';

const EmailreminderRouting: ModuleWithProviders<EmailreminderModule> = RouterModule.forChild([
  {

    path:'email-reminder',
    pathMatch: 'full',
    component: EmailreminderComponent,
    canActivate: []
  },
 
]);


@NgModule({
  declarations: [
    EmailreminderComponent,
  ], 
  imports: [
    CommonModule,
    BrowserModule,
    EmailreminderRouting
    
  ],
  exports:[
    EmailreminderComponent,
  ],
  providers: [],
  bootstrap: []
})
export class EmailreminderModule { }
