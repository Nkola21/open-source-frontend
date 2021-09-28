import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMemberListComponent } from './main-member-list/main-member-list.component';
import { RouterModule } from '@angular/router';
import { MainMemberViewComponent } from './main-member-view/main-member-view.component';
import { MaterialModule } from '../../material/material.module';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { MainMemberFormComponent } from './main-member-form/main-member-form.component';
import { SharedModule } from './../../shared/shared.module';
 

const MainMemberRouting: ModuleWithProviders<MainMembersModule> = RouterModule.forChild([
  {
    path: 'consultants/:id/applicants',
    pathMatch: 'full',
    component: MainMemberListComponent,
    canActivate: []
  },
  {
    path: 'parlours/:id/applicants',
    pathMatch: 'full',
    component: MainMemberListComponent,
    canActivate: []
  },
  {
    path: 'main-members/:id/view',
    component: MainMemberViewComponent,
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
    MainMemberViewComponent,
    MainMemberFormComponent
  ],
  exports: [
    MainMemberListComponent,
    MainMemberViewComponent,
    MainMemberFormComponent,
    MatListModule,
    MatTooltipModule
  ],
  entryComponents: [MainMemberListComponent]
})
export class MainMembersModule { }
