import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, BehaviorSubject, merge } from 'rxjs';

import { map } from 'rxjs/operators';
import { OpenService } from 'src/app/shared/services/open.service';

export class PlanDataSource extends DataSource<any> {

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
  selector: 'plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit {

  displayedColumns = ['id', 'plan_name', 'person_name', 'number', 'actions'];
  plans: Array<any> = [];
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
    this.initPlans();
  }

  initializePaginator() {
    this.dataSource.paginator = this.paginator;
  }

  onPaginatorChange(event: any) {
    this.page = event;
    this.dataSource = new PlanDataSource(this.plans, this.page);
  }

  initPlans() {
    this.plans = [];
    this.page = {
      'pageSize': 5,
      'pageIndex': 0,
    };

    this.loadingState = 'loading';
    this.dataSource = new PlanDataSource([], this.page);

    this.openService.getUrl(`plan/`)
      .subscribe(
        (plans: Array<any>) => {
          this.plans = plans;
          this.configurePlans(plans);
          this.loadingState = 'complete';
        },
        error => {
          console.log("error occured.");
        });
  }

  configurePlans(plans: Array<any>): void {
    this.tableSize = this.plans.length
    this.dataSource = new MatTableDataSource(plans);
    this.initializePaginator()
  }

  navigateToPlanView(plan: any) {
    this.router.navigate(['plans', plan.id,'view']);
  }

  navigateToPlanForm(plan: any) {
    this.router.navigate(['plans', plan.id,'form']);
  }
}
