import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { MatListModule } from '@angular/material/list';
import { AdditionalExtendedMemberListComponent } from './additional-extended-member-list/additional-extended-member-list.component';
import { AdditionalExtendedMemberFormComponent } from './additional-extended-member-form/additional-extended-member-form.component';
import { AdditionalExtendedMemberViewComponent } from './additional-extended-member-view/additional-extended-member-view.component';


const ExtendedMemberRouting: ModuleWithProviders<AdditionalExtendedMembersModule> = RouterModule.forChild([
  {
    path: 'applicants/:id/add-extended-members/all',
    pathMatch: 'full',
    component: AdditionalExtendedMemberListComponent,
    canActivate: []
  },
  {
    path: 'add-extended-members/:id/view',
    component: AdditionalExtendedMemberViewComponent,
    canActivate: []
  },
  {
    path: 'add-extended-members/:id/form',
    component: AdditionalExtendedMemberFormComponent
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
    AdditionalExtendedMemberListComponent,
    AdditionalExtendedMemberViewComponent,
    AdditionalExtendedMemberFormComponent
  ],
  exports: [
    AdditionalExtendedMemberListComponent,
    AdditionalExtendedMemberViewComponent,
    AdditionalExtendedMemberFormComponent,
    MatListModule
  ],
  entryComponents: [AdditionalExtendedMemberListComponent]
})
export class AdditionalExtendedMembersModule { }
