import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyListComponent } from './policy-list/policy-list.component';
import { RouterModule } from '@angular/router';
import { PolicyViewComponent } from './policy-view/policy-view.component';
import { MaterialModule } from '../../material/material.module';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { PolicyFormComponent } from './policy-form/policy-form.component';


const PolicyRouting: ModuleWithProviders<PolicyModule> = RouterModule.forChild([
  {
    path: 'policy',
    pathMatch: 'full',
    component: PolicyListComponent,
    canActivate: []
  },
  {
    path: 'policy/:id/view',
    component: PolicyViewComponent,
    canActivate: []
  },
  {
    path: 'policy/:Id/form',
    component: PolicyFormComponent
  }

]);

@NgModule({
  imports: [
    CommonModule,
    PolicyRouting,
    MaterialModule,
    MatListModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  declarations: [
    PolicyListComponent,
    PolicyViewComponent,
    PolicyFormComponent
  ],
  exports: [
    PolicyListComponent,
    PolicyViewComponent,
    PolicyFormComponent,
    MatListModule,
    MatTooltipModule
  ],
  entryComponents: [PolicyListComponent]
})
export class PolicyModule { }
