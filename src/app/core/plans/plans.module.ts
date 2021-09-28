import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanListComponent } from './plan-list/plan-list.component';
import { RouterModule } from '@angular/router';
import { PlanViewComponent } from './plan-view/plan-view.component';
import { MaterialModule } from '../../material/material.module';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { PlanFormComponent } from './plan-form/plan-form.component';


const PlanRouting: ModuleWithProviders<PlansModule> = RouterModule.forChild([
  {
    path: 'parlours/:id/plans',
    pathMatch: 'full',
    component: PlanListComponent,
    canActivate: []
  },
  {
    path: 'plans/:id/view',
    component: PlanViewComponent,
    canActivate: []
  },
  {
    path: 'plans/:id/form',
    component: PlanFormComponent
  },
  {
    path: 'plans/form',
    component: PlanFormComponent
  }

]);

@NgModule({
  imports: [
    CommonModule,
    PlanRouting,
    MaterialModule,
    MatListModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  declarations: [
    PlanListComponent,
    PlanViewComponent,
    PlanFormComponent
  ],
  exports: [
    PlanListComponent,
    PlanViewComponent,
    PlanFormComponent,
    MatListModule,
    MatTooltipModule
  ],
  entryComponents: [PlanListComponent]
})
export class PlansModule { }
