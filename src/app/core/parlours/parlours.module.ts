import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParlourListComponent } from './parlour-list/parlour-list.component';
import { ArchivedParlourListComponent } from './archved-parlour-list/archived-parlour-list.component';
import { PendingParlourListComponent } from './pending-parlour-list/pending-parlour-list.component';
import { RouterModule } from '@angular/router';
import { ParlourViewComponent } from './parlour-view/parlour-view.component';
import { MaterialModule } from '../../material/material.module';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { ParlourFormComponent } from './parlour-form/parlour-form.component';
import { PlansModule } from './../plans/plans.module';
import { SharedModule } from 'src/app/shared/shared.module';

const ParlourRouting: ModuleWithProviders<ParloursModule> = RouterModule.forChild([
  {
    path: 'parlours',
    pathMatch: 'full',
    component: ParlourListComponent,
    canActivate: []
  },
  {
    path: 'parlours/:id/view',
    component: ParlourViewComponent,
    canActivate: []
  },

  {
    path: 'parlours/form',
    component: ParlourFormComponent
  },
  {
    path: 'parlours/:id/form',
    component: ParlourFormComponent
  },
  {
    path: 'parlours/archived-parlours',
    component: ArchivedParlourListComponent
  },
  {
    path: 'parlours/pending-parlours',
    component: PendingParlourListComponent
  }

]);

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ParlourRouting,
    MaterialModule,
    MatListModule,
    MatTooltipModule,
    ReactiveFormsModule,
    PlansModule
  ],
  declarations: [
    ParlourListComponent,
    ArchivedParlourListComponent,
    PendingParlourListComponent,
    ParlourViewComponent,
    ParlourFormComponent
  ],
  exports: [
    ParlourListComponent,
    ArchivedParlourListComponent,
    PendingParlourListComponent,
    ParlourViewComponent,
    ParlourFormComponent,
    MatListModule,
    MatTooltipModule
  ],
  entryComponents: [ParlourListComponent]
})
export class ParloursModule { }
