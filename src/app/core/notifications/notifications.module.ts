import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { NotificationsComponent } from './notifications.component';
 

const NotificationsRouting: ModuleWithProviders<NotificationsModule> = RouterModule.forChild([
  {
    path: 'parlours/:id/notifications',
    pathMatch: 'full',
    component: NotificationsComponent,
    canActivate: []
  }

]);

@NgModule({
  imports: [
    CommonModule,
    NotificationsRouting,
    MaterialModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    NotificationsComponent
  ],
  exports: [
    NotificationsComponent
  ],
  entryComponents: [NotificationsComponent]
})
export class NotificationsModule { }
