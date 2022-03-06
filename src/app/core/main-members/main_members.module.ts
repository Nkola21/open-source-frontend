import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMemberListComponent } from './main-member-list/main-member-list.component';
import { MainMemberSubListComponent } from './main-member-sub-list/main-member-sub-list.component';
import { RouterModule } from '@angular/router';
import { MainMemberBulkAddComponent } from './main-member-bulk-add/main-member-bulk-add.component';
import { MaterialModule } from '../../material/material.module';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { MainMemberFormComponent, FileValueAccessor } from './main-member-form/main-member-form.component';
import { SharedModule } from './../../shared/shared.module';
 

const MainMemberRouting: ModuleWithProviders<MainMembersModule> = RouterModule.forChild([
  {
    path: 'consultants/:id/applicants',
    pathMatch: 'full',
    component: MainMemberListComponent,
    canActivate: []
  },
  {
    path: 'parlours/:id/members',
    pathMatch: 'full',
    component: MainMemberSubListComponent,
    canActivate: []
  },
  {
    path: 'parlours/:id/applicants',
    pathMatch: 'full',
    component: MainMemberListComponent,
    canActivate: []
  },
  {
    path: 'main-members/bulk-add',
    component: MainMemberBulkAddComponent,
    canActivate: []
  },
  {
    path: 'main-members/:id/form',
    component: MainMemberFormComponent
  },
  {
    path: 'main-members/form',
    component: MainMemberFormComponent
  }

]);

@NgModule({
  imports: [
    CommonModule,
    MainMemberRouting,
    MaterialModule,
    MatListModule,
    // MatTooltipModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    MainMemberListComponent,
    MainMemberSubListComponent,
    MainMemberBulkAddComponent,
    MainMemberFormComponent,
    FileValueAccessor
  ],
  exports: [
    MainMemberListComponent,
    MainMemberBulkAddComponent,
    MainMemberFormComponent,
    MatListModule,
    MatTooltipModule
  ],
  entryComponents: [MainMemberListComponent]
})
export class MainMembersModule { }
