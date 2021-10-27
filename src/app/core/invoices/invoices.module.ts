import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { RouterModule } from '@angular/router';
import { MAT_DATE_LOCALE } from '@angular/material/core'
import { MaterialModule } from '../../material/material.module';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';


const InvoiceRouting: ModuleWithProviders<InvoiceModule> = RouterModule.forChild([
  {
    path: 'applicants/:applicant_id/invoices',
    component: InvoiceListComponent
  }

]);

@NgModule({
  imports: [
    CommonModule,
    InvoiceRouting,
    MaterialModule,
    MatListModule,
    MatTooltipModule
  ],
  declarations: [
    InvoiceListComponent
  ],
  exports: [
    InvoiceListComponent,
    MatListModule,
    MatTooltipModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  entryComponents: [InvoiceListComponent]
})
export class InvoiceModule { }
