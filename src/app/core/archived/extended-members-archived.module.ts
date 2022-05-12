import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtendedMemberArchivedListComponent } from './extended-member-archived-list/extended-member-archived-list.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';


const ExtendedMemberArchivedRouting: ModuleWithProviders<ExtendedMembersArchivedModule> = RouterModule.forChild([
  {
    path: 'parlours/:id/archived-applicants',
    pathMatch: 'full',
    component: ExtendedMemberArchivedListComponent,
    canActivate: []
  },

]);

@NgModule({
  imports: [
    CommonModule,
    ExtendedMemberArchivedRouting,
    MaterialModule,
    MatListModule,
    // MatTooltipModule,
    ReactiveFormsModule
  ],
  declarations: [
    ExtendedMemberArchivedListComponent,
  ],
  exports: [
    ExtendedMemberArchivedListComponent,
    MatListModule,
    MatTooltipModule
  ],
  entryComponents: [ExtendedMemberArchivedListComponent]
})
export class ExtendedMembersArchivedModule { }
