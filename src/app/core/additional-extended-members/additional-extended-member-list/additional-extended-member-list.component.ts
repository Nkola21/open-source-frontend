import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, BehaviorSubject, merge } from 'rxjs';

import { map } from 'rxjs/operators';
import { OpenService } from 'src/app/shared/services/open.service';

export class AdditionalExtendedMemberDataSource extends DataSource<any> {

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
  selector: 'app-add-extended-member-list',
  templateUrl: './additional-extended-member-list.component.html',
  styleUrls: ['./additional-extended-member-list.component.css']
})
export class AdditionalExtendedMemberListComponent implements OnInit {

  displayedColumns = ['full_name', 'date', 'contact', 'date_joined', 'actions'];
  extended_members: Array<any> = [];
  dataSource: any;
  page: any;
  loadingState: any;
  tableSize: number;
  permission: any
  user: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public openService: OpenService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public router: Router) { }

  ngOnInit(): void {
    this.permission = this.openService.getPermissions();
    this.user = this.openService.getUser();
    this.route.params.subscribe(
      (params) => {
        const id = +params['id'];
        this.initExtendedMembers(id);
      }
    )
  }

  initializePaginator() {
    this.dataSource.paginator = this.paginator;
  }

  onPaginatorChange(event: any) {
    this.page = event;
    this.dataSource = new AdditionalExtendedMemberDataSource(this.extended_members, this.page);
  }

  initExtendedMembers(id) {
    this.extended_members = [];
    const permission = this.permission;
    this.page = {
      'pageSize': 5,
      'pageIndex': 0,
    };

    this.loadingState = 'loading';
    this.dataSource = new AdditionalExtendedMemberDataSource([], this.page);

    this.openService.getUrl(`applicants/${id}/extended-members/all`)
      .subscribe(
        (extended_members: Array<any>) => {
          this.extended_members = extended_members;
          this.configureMainMembers(extended_members);
          this.loadingState = 'complete';
        },
        error => {
          console.log(error);
        });
  }

  configureMainMembers(extended_members: Array<any>): void {
    this.tableSize = this.extended_members.length
    this.dataSource = new MatTableDataSource(extended_members);
    this.initializePaginator()
  }

  navigateToExtendedMemberView(extended_members: any) {
    this.router.navigate(['main_members', extended_members.id,'view']);
  }

  navigateToExtendedMemberForm(extended_members: any) {
    this.router.navigate(['main_members', extended_members.id,'form']);
  }

  navigateToExtendedMembersListView(id: any) {
    console.log(id)
    this.router.navigate(['extended_members', id,'all']);
  }
}
