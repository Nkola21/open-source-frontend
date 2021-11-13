import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, BehaviorSubject, merge } from 'rxjs';

import { map } from 'rxjs/operators';
import { OpenService, CommonService } from 'src/app/shared/services/open.service';

export class PaymentDataSource extends DataSource<any> {

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
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

  displayedColumns = ['id', 'payment_name', 'person_name', 'number', 'actions'];
  payments: Array<any> = [];
  dataSource: any;
  page: any;
  loadingState: any;
  tableSize: number;
  user: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public openService: OpenService,
    public service: CommonService,
    public dialog: MatDialog,
    public router: Router) { }

  ngOnInit(): void {
    this.user = this.openService.getUser();
    this.transition(this.user);
    this.initPayments();
  }

  transition(user: any) {
    this.service.switchHeader(user);
  }

  initializePaginator() {
    this.dataSource.paginator = this.paginator;
  }

  onPaginatorChange(event: any) {
    this.page = event;
    this.dataSource = new PaymentDataSource(this.payments, this.page);
  }

  initPayments() {
    this.payments = [];
    this.page = {
      'pageSize': 5,
      'pageIndex': 0,
    };

    this.loadingState = 'loading';
    this.dataSource = new PaymentDataSource([], this.page);

    this.openService.getUrl(`payments/`)
      .subscribe(
        (payments: Array<any>) => {
          this.payments = payments;
          this.configurePayments(payments);
          this.loadingState = 'complete';
        },
        error => {
          console.log(error);
        });
  }

  configurePayments(payments: Array<any>): void {
    this.tableSize = this.payments.length
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
