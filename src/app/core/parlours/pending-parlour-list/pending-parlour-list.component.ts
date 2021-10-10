import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, BehaviorSubject, merge } from 'rxjs';

import { map } from 'rxjs/operators';
import { OpenService } from 'src/app/shared/services/open.service';
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


@Component({
  selector: 'app-pending-parlour-list',
  templateUrl: './pending-parlour-list.component.html',
  styleUrls: ['./pending-parlour-list.component.css']
})
export class PendingParlourListComponent implements OnInit {

  displayedColumns = ['id', 'parlour_name', 'person_name', 'number', 'actions'];
  parlours: Array<any> = [];
  parlour: any;
  dataSource: any;
  page: any;
  loadingState: any;
  tableSize: number;

  searchField: null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public openService: OpenService,
    private toastr: ToastrService,
    public router: Router) {
     }

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

    this.openService.getUrl(`parlours/pending`)
      .subscribe(
        (parlours: Array<any>) => {
          this.parlours = parlours;
          this.configureParlours(parlours);
          this.loadingState = 'complete';
        },
        error => {
          const err = error["error"]
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

  navigateToPalourActiveParlours() {
    this.router.navigate(['parlours']);
  }

  navigateToPalourForm(parlour: any) {
    this.router.navigate(['parlours', parlour.id,'form']);
  }

  confirmActivateParlour(parlour: any) {
    this.parlour = parlour;
    const button = document.getElementById('openUnSuspendModal');
    button.click();
  }

  activateParlour(parlour: any) {
    this.openService.put(`parlours/${parlour.id}/activate`, {'state': 1})
    .subscribe((result) => {
      this.toastr.success('Parlour was unsuspended successfully', '');
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
    },
    error => {
      const err = error["error"];
      this.toastr.error(err["description"], err['title']);
    });
  }
}
