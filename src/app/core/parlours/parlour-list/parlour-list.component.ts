import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, BehaviorSubject, merge } from 'rxjs';

import { map } from 'rxjs/operators';
import { OpenService } from 'src/app/shared/services/open.service';

export class ParlourDataSource extends DataSource<any> {

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
  selector: 'app-parlour-list',
  templateUrl: './parlour-list.component.html',
  styleUrls: ['./parlour-list.component.css']
})
export class ParlourListComponent implements OnInit {

  displayedColumns = ['id', 'parlour_name', 'person_name', 'number', 'actions'];
  parlours: Array<any> = [];
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
    this.initParlours();
  }

  initializePaginator() {
    this.dataSource.paginator = this.paginator;
  }

  onPaginatorChange(event: any) {
    this.page = event;
    this.dataSource = new ParlourDataSource(this.parlours, this.page);
  }

  initParlours() {
    this.parlours = [];
    this.page = {
      'pageSize': 5,
      'pageIndex': 0,
    };

    this.loadingState = 'loading';
    this.dataSource = new ParlourDataSource([], this.page);

    this.openService.getUrl(`parlour/`)
      .subscribe(
        (parlours: Array<any>) => {
          console.log(parlours);
          this.parlours = parlours;
          this.configureParlours(parlours);
          this.loadingState = 'complete';
        },
        error => {
          console.log("error occured.");
        });
  }

  configureParlours(parlours: Array<any>): void {
    this.tableSize = this.parlours.length
    this.dataSource = new MatTableDataSource(parlours);
    this.initializePaginator()
  }

  navigateToPalourView(parlour: any) {
    this.router.navigate(['parlours', parlour.id,'view']);
  }

  navigateToPalourForm(parlour: any) {
    this.router.navigate(['parlours', parlour.id,'form']);
  }
}
