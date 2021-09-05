import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { MatListModule } from '@angular/material/list';
import { ExtendedMemberListComponent } from './extended-member-list/extended-member-list.component';
import { ExtendedMemberFormComponent } from './extended-member-form/extended-member-form.component';
import { ExtendedMemberViewComponent } from './extended-member-view/extended-member-view.component';


const ExtendedMemberRouting: ModuleWithProviders<ExtendedMembersModule> = RouterModule.forChild([
  {
    path: 'applicants/:id/extended-members/all',
    pathMatch: 'full',
    component: ExtendedMemberListComponent,
    canActivate: []
  },
  {
    path: 'extended-members/:id/view',
    component: ExtendedMemberViewComponent,
    canActivate: []
  },
  {
    path: 'extended-members/:Id/form',
    component: ExtendedMemberFormComponent
  }

]);

@NgModule({
  imports: [
    CommonModule,
    ExtendedMemberRouting,
    MaterialModule,
    MatListModule,
    ReactiveFormsModule
  ],
  declarations: [
    ExtendedMemberListComponent,
    ExtendedMemberViewComponent,
    ExtendedMemberFormComponent
  ],
  exports: [
    ExtendedMemberListComponent,
    ExtendedMemberViewComponent,
    ExtendedMemberFormComponent,
    MatListModule
  ],
  entryComponents: [ExtendedMemberListComponent]
})
export class ExtendedMembersModule { }
