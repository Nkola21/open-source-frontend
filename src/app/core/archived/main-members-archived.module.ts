import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMemberArchivedListComponent } from './main-member-archived-list/main-member-archived-list.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';


const MainMemberArchivedRouting: ModuleWithProviders<MainMembersArchivedModule> = RouterModule.forChild([
  {
    path: 'parlours/:id/archived-applicants',
    pathMatch: 'full',
    component: MainMemberArchivedListComponent,
    canActivate: []
  },

]);

@NgModule({
  imports: [
    CommonModule,
    MainMemberArchivedRouting,
    MaterialModule,
    MatListModule,
    // MatTooltipModule,
    ReactiveFormsModule
  ],
  declarations: [
    MainMemberArchivedListComponent,
  ],
  exports: [
    MainMemberArchivedListComponent,
    MatListModule,
    MatTooltipModule
  ],
  entryComponents: [MainMemberArchivedListComponent]
})
export class MainMembersArchivedModule { }
