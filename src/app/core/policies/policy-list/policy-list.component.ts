import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, BehaviorSubject, merge } from 'rxjs';

import { map } from 'rxjs/operators';
import { OpenService } from 'src/app/shared/services/open.service';

export class PolicyDataSource extends DataSource<any> {

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
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.css']
})
export class PolicyListComponent implements OnInit {

  displayedColumns = ['id', 'policy_name', 'person_name', 'number', 'actions'];
  policies: Array<any> = [];
  dataSource: any;
  page: any;
  loadingState: any;
  tableSize: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public openService: OpenService,
    public dialog: MatDialog,
    public router: Router) { }

  ngOnInit(): void {
    this.initPolicys();
  }

  initializePaginator() {
    this.dataSource.paginator = this.paginator;
  }

  onPaginatorChange(event: any) {
    this.page = event;
    this.dataSource = new PolicyDataSource(this.policies, this.page);
  }

  initPolicys() {
    this.policies = [];
    this.page = {
      'pageSize': 5,
      'pageIndex': 0,
    };

    this.loadingState = 'loading';
    this.dataSource = new PolicyDataSource([], this.page);

    this.openService.getUrl(`policy/`)
      .subscribe(
        (policies: Array<any>) => {
          console.log(policies);
          this.policies = policies;
          this.configurePolicys(policies);
          this.loadingState = 'complete';
        },
        error => {
          console.log("error occured.");
        });
  }

  configurePolicys(policys: Array<any>): void {
    this.tableSize = this.policies.length
    this.dataSource = new MatTableDataSource(policys);
    this.initializePaginator()
  }

  navigateToPolicyView(policy: any) {
    this.router.navigate(['policy', policy.id,'view']);
  }

  navigateToPolicyForm(policy: any) {
    this.router.navigate(['policy', policy.id,'form']);
  }
}
