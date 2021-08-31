import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, BehaviorSubject, merge } from 'rxjs';

import { map } from 'rxjs/operators';
import { OpenService } from 'src/app/shared/services/open.service';

export class ConsultantDataSource extends DataSource<any> {

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
  selector: 'app-consultant-list',
  templateUrl: './consultant-list.component.html',
  styleUrls: ['./consultant-list.component.css']
})
export class ConsultantListComponent implements OnInit {

  displayedColumns = ['full_name', 'number', 'branch', 'email', 'actions'];
  consultants: Array<any> = [];
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
    this.initConsultants();
  }

  initializePaginator() {
    this.dataSource.paginator = this.paginator;
  }

  onPaginatorChange(event: any) {
    this.page = event;
    this.dataSource = new ConsultantDataSource(this.consultants, this.page);
  }

  initConsultants() {
    this.consultants = [];
    this.page = {
      'pageSize': 5,
      'pageIndex': 0,
    };

    this.loadingState = 'loading';
    this.dataSource = new ConsultantDataSource([], this.page);

    this.openService.getUrl(`consultants/`)
      .subscribe(
        (consultants: Array<any>) => {
          console.log(consultants);
          this.consultants = consultants;
          this.configureConsultants(consultants);
          this.loadingState = 'complete';
        },
        error => {
          console.log("error occured.");
        });
  }

  configureConsultants(consultants: Array<any>): void {
    this.tableSize = this.consultants.length
    this.dataSource = new MatTableDataSource(consultants);
    this.initializePaginator()
  }

  navigateToConsultantView(consultant: any) {
    this.router.navigate(['consultants', consultant.id,'view']);
  }

  navigateToConsultantForm(consultant: any) {
    this.router.navigate(['consultants', consultant.id,'form']);
  }
}
