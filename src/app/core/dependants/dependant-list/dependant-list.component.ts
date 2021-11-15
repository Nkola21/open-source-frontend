import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, BehaviorSubject, merge } from 'rxjs';

import { map } from 'rxjs/operators';
import { OpenService } from 'src/app/shared/services/open.service';

export class DependantDataSource extends DataSource<any> {

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
  selector: 'app-dependant-list',
  templateUrl: './dependant-list.component.html',
  styleUrls: ['./dependant-list.component.css']
})
export class DependantListComponent implements OnInit {

  displayedColumns = ['first_name', 'last_name', 'contact', 'date_joined', 'actions'];
  dependants: Array<any> = [];
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
    this.initDependants();
  }

  initializePaginator() {
    this.dataSource.paginator = this.paginator;
  }

  onPaginatorChange(event: any) {
    this.page = event;
    this.dataSource = new DependantDataSource(this.dependants, this.page);
  }

  initDependants() {
    this.dependants = [];
    this.page = {
      'pageSize': 5,
      'pageIndex': 0,
    };

    this.loadingState = 'loading';
    this.dataSource = new DependantDataSource([], this.page);

    this.openService.getUrl(`dependants/`)
      .subscribe(
        (dependants: Array<any>) => {
          this.dependants = dependants;
          this.configureDependants(dependants);
          this.loadingState = 'complete';
        },
        error => {
          console.log(error);
        });
  }

  configureDependants(dependants: Array<any>): void {
    this.tableSize = this.dependants.length
    this.dataSource = new MatTableDataSource(dependants);
    this.initializePaginator()
  }

  navigateToDependantView(dependant: any) {
    this.router.navigate(['dependants', dependant.id,'view']);
  }

  navigateToDependantForm(dependant: any) {
    this.router.navigate(['dependants', dependant.id,'form']);
  }
}
