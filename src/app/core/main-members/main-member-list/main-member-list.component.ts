import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, BehaviorSubject, merge } from 'rxjs';

import { map } from 'rxjs/operators';
import { OpenService } from 'src/app/shared/services/open.service';

export class MainMemberDataSource extends DataSource<any> {

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
  selector: 'app-main-member-list',
  templateUrl: './main-member-list.component.html',
  styleUrls: ['./main-member-list.component.css']
})
export class MainMemberListComponent implements OnInit {

  displayedColumns = ['first_name', 'last_name', 'contact', 'date_joined', 'actions'];
  main_members: Array<any> = [];
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
    this.initMainMembers();
  }

  initializePaginator() {
    this.dataSource.paginator = this.paginator;
  }

  onPaginatorChange(event: any) {
    this.page = event;
    this.dataSource = new MainMemberDataSource(this.main_members, this.page);
  }

  initMainMembers() {
    this.main_members = [];
    this.page = {
      'pageSize': 5,
      'pageIndex': 0,
    };

    this.loadingState = 'loading';
    this.dataSource = new MainMemberDataSource([], this.page);

    this.openService.getUrl(`main-members/`)
      .subscribe(
        (main_members: Array<any>) => {
          console.log(main_members);          
          this.main_members = main_members;
          this.configureMainMembers(main_members);
          this.loadingState = 'complete';
        },
        error => {
          console.log(error);
        });
  }

  configureMainMembers(main_members: Array<any>): void {
    this.tableSize = this.main_members.length
    this.dataSource = new MatTableDataSource(main_members);
    this.initializePaginator()
  }

  navigateToMainMemberView(main_member: any) {
    this.router.navigate(['main_members', main_member.id,'view']);
  }

  navigateToMainMemberForm(main_member: any) {
    this.router.navigate(['main_members', main_member.id,'form']);
  }
}
