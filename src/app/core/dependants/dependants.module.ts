import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DependantListComponent } from './dependant-list/dependant-list.component';
import { RouterModule } from '@angular/router';
import { DependantViewComponent } from './dependant-view/dependant-view.component';
import { MaterialModule } from '../../material/material.module';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { DependantFormComponent } from './dependant-form/dependant-form.component';


const DependantRouting: ModuleWithProviders<DependantsModule> = RouterModule.forChild([
  {
    path: 'dependants',
    pathMatch: 'full',
    component: DependantListComponent,
    canActivate: []
  },
  {
    path: 'dependants/:id/view',
    component: DependantViewComponent,
    canActivate: []
  },
  {
    path: 'dependants/:Id/form',
    component: DependantFormComponent
  }

]);

@NgModule({
  imports: [
    CommonModule,
    DependantRouting,
    MaterialModule,
    MatListModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  declarations: [
    DependantListComponent,
    DependantViewComponent,
    DependantFormComponent
  ],
  exports: [
    DependantListComponent,
    DependantViewComponent,
    DependantFormComponent,
    MatListModule,
    MatTooltipModule
  ],
  entryComponents: [DependantListComponent]
})
export class DependantsModule { }
