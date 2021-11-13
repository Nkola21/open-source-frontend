import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, BehaviorSubject, merge } from 'rxjs';

import { map } from 'rxjs/operators';
import { OpenService, CommonService } from 'src/app/shared/services/open.service';
import { ToastrService } from 'ngx-toastr';

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
  selector: 'app-archived-parlour-list',
  templateUrl: './archived-parlour-list.component.html',
  styleUrls: ['./archived-parlour-list.component.css']
})
export class ArchivedParlourListComponent implements OnInit {

  displayedColumns = ['id', 'parlour_name', 'person_name', 'number', 'actions'];
  parlours: Array<any> = [];
  parlour: any;
  dataSource: any;
  page: any;
  loadingState: any;
  tableSize: number;
  user: any;

  searchField: null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public openService: OpenService,
    public service: CommonService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    public router: Router) {
     }

  ngOnInit(): void {
    this.user = this.openService.getUser()
    this.transition(this.user);
    this.initParlours();
  }

  initializePaginator() {
    this.dataSource.paginator = this.paginator;
  }

  transition(user: any) {
    this.service.switchHeader(user);
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

    this.openService.getUrl(`parlours/archived`)
      .subscribe(
        (parlours: Array<any>) => {
          this.parlours = parlours;
          this.configureParlours(parlours);
          this.loadingState = 'complete';
        },
        error => {
          const err = error["error"];
          this.toastr.error(err["description"], err['title']);
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

  redirectToMainMembersList(parlour) {
    const view = [`/parlours/${parlour.id}/members`];
    this.router.navigate(view);
  }

  navigateToPalourAddForm() {
    this.router.navigate(['signup']);
  }

  navigateToPalourActiveParlours() {
    this.router.navigate(['parlours']);
  }

  navigateToPalourForm(parlour: any) {
    this.router.navigate(['parlours', parlour.id,'form']);
  }

  confirmUnSuspendParlour(parlour: any) {
    this.parlour = parlour;
    const button = document.getElementById('openUnSuspendModal');
    button.click();
  }

  unsuspendParlour(parlour: any) {
    this.openService.put(`parlours/${parlour.id}/activate`, {'state': 1})
    .subscribe((result) => {
      this.toastr.success('Parlour was unsuspended successfully', '');
      this.parlours = this.parlours.filter(val => { 
        if (val.id != parlour.id) {
          return val;
        }
      });
      this.configureParlours(this.parlours);
      this.initializePaginator()
    },
    error => {
      const err = error["error"];
      this.toastr.error(err["description"], err['title']);
    });
  }

  confirmDeleteParlour(parlour: any) {
    this.parlour = parlour;
    const button = document.getElementById('openDeleteModal');
    button.click();
  }

  deleteParlour(parlour: any) {
    this.openService.delete(`parlours/${parlour.id}/delete`)
    .subscribe((result) => {
      this.toastr.success('Parlour was deleted successfully', '');
      this.parlours = this.parlours.filter(val => { 
        if (val.id != parlour.id) {
          return val;
        }
      });
      this.configureParlours(this.parlours);
      this.initializePaginator()
    },
    error => {
      const err = error["error"];
      this.toastr.error(err["description"], err['title']);
    });
  }
}
