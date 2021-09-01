import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsultantViewComponent } from './consultant-view/consultant-view.component';
import { ConsultantListComponent } from './consultant-list/consultant-list.component';
import { MaterialModule } from '../../material/material.module';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConsultantFormComponent } from './consultant-form/consultant-form.component';


const ConsultantRouting: ModuleWithProviders<ConsultantModule> = RouterModule.forChild([
  {
    path: 'consultants/parlour/:id',
    pathMatch: 'full',
    component: ConsultantListComponent,
    canActivate: []
  },
  {
    path: 'consultants/:id/view',
    component: ConsultantViewComponent,
    canActivate: []
  },
  {
    path: 'consultants/:Id/form',
    component: ConsultantFormComponent
  },
  {
    path: 'consultants/parlour/:id',
    component: ConsultantFormComponent
  }

]);

@NgModule({
  imports: [
    CommonModule,
    ConsultantRouting,
    MaterialModule,
    MatListModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  declarations: [
    ConsultantListComponent,
    ConsultantViewComponent,
    ConsultantFormComponent
  ],
  exports: [
    ConsultantListComponent,
    ConsultantViewComponent,
    ConsultantFormComponent,
    MatListModule,
    MatTooltipModule
  ],
  entryComponents: [ConsultantListComponent]
})
export class ConsultantModule { }
