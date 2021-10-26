import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, BehaviorSubject, merge } from 'rxjs';

import { map } from 'rxjs/operators';
import { OpenService } from 'src/app/shared/services/open.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

export class InvoiceDataSource extends DataSource<any> {

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  dataChange: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);

  constructor(private data1: Array<any> = [], private page: any) {
    super();
  }

  get data(): Array<any> {
    return this.dataChange.value;
  }

  connect(): Observable<Element[]> {
    const displayDataChanges = [
      this.dataChange
    ];
    return merge(...displayDataChanges)
      .pipe(
        map(() => {
          const data2 = this.data1.slice();
          const startIndex = this.page['pageIndex'] * this.page['pageSize'];
          return data2.splice(startIndex, this.page['pageSize']);
        }));
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disconnect() { }
}

const dialogConfig = new MatDialogConfig();

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  displayedColumns = ['invoice_number', 'amount', 'number_of_months', 'date', 'contact', 'document'];
  invoices: Array<any> = [];
  dataSource: any;
  page: any;
  loadingState: any;
  tableSize: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public openService: OpenService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        const id = +params['applicant_id'];

        if (id) {
          this.initInvoices(id);
        }
      });
  }

  getUrl(invoice) {
    const base_url = this.openService.getBaseUrl()
    return `${base_url}/${invoice.path}`
  }
  initializePaginator() {
    this.dataSource.paginator = this.paginator;
  }

  onPaginatorChange(event: any) {
    this.page = event;
    this.dataSource = new InvoiceDataSource(this.invoices, this.page);
  }

  initInvoices(id) {
    this.invoices = [];
    this.page = {
      'pageSize': 5,
      'pageIndex': 0,
    };

    this.loadingState = 'loading';
    this.dataSource = new InvoiceDataSource([], this.page);

    this.openService.getUrl(`applicants/${id}/invoices/all`)
      .subscribe(
        (invoices: Array<any>) => {
          this.invoices = invoices;
          console.log(invoices)
          this.configureInvoices(invoices);
          this.loadingState = 'complete';
        },
        error => {
          console.log(error);
        });
  }

  configureInvoices(payments: Array<any>): void {
    this.tableSize = this.invoices.length
    this.dataSource = new MatTableDataSource(payments);
    this.initializePaginator()
  }

  navigateToPalourView(payment: any) {
    this.router.navigate(['payments', payment.id,'view']);
  }

  navigateToPalourForm(payment: any) {
    this.router.navigate(['payments', payment.id,'form']);
  }
}
