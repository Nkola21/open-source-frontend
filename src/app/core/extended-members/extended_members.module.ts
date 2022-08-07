import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { MatListModule } from '@angular/material/list';
import { ExtendedMemberListComponent } from './extended-member-list/extended-member-list.component';
import { ExtendedMemberFormComponent } from './extended-member-form/extended-member-form.component';
import { ExtendedMemberViewComponent } from './extended-member-view/extended-member-view.component';
import { ExtendedMemberArchivedListComponent } from '../archived/extended-member-archived-list/extended-member-archived-list.component';
import { SharedModule } from './../../shared/shared.module';


const ExtendedMemberRouting: ModuleWithProviders<ExtendedMembersModule> = RouterModule.forChild([
  {
    path: 'main-members/:id/extended-members/all',
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
    path: 'main-members/:main_id/extended-members/:id/form',
    component: ExtendedMemberFormComponent
  },
  {
    path: 'main-members/:main_id/extended-members/form',
    component: ExtendedMemberFormComponent
  },
  {
    path: 'main-members/:id/extended-members/archived',
    component: ExtendedMemberArchivedListComponent
  }

]);

@NgModule({
  imports: [
    CommonModule,
    ExtendedMemberRouting,
    MaterialModule,
    MatListModule,
    ReactiveFormsModule,
    SharedModule
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
