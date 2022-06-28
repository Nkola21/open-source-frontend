import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, BehaviorSubject, merge } from 'rxjs';

import { map } from 'rxjs/operators';
import { OpenService } from 'src/app/shared/services/open.service';

export class ApplicantDataSource extends DataSource<any> {

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
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.css']
})
export class ApplicantListComponent implements OnInit {

  displayedColumns = ['full_name', 'id_number', 'contact', 'extended_members', 'premium', 'policy_num', 'policy', 'date_joined', 'status', 'actions'];
  applicants: Array<any> = [];
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
    this.initApplicants(this.user.id)
  }

  initializePaginator() {
    this.dataSource.paginator = this.paginator;
  }

  onPaginatorChange(event: any) {
    this.page = event;
    this.dataSource = new ApplicantDataSource(this.applicants, this.page);
  }

  initApplicants(id) {
    this.applicants = [];
    const permission = this.permission;
    this.page = {
      'pageSize': 5,
      'pageIndex': 0,
    };

    this.loadingState = 'loading';
    this.dataSource = new ApplicantDataSource([], this.page);

    this.openService.getUrl(`${permission.toLowerCase()}s/${id}/applicants/all`)
      .subscribe(
        (applicants: Array<any>) => {    
          this.applicants = applicants;
          this.configureApplicants(applicants);
          this.loadingState = 'complete';
        },
        error => {
          console.log(error);
        });
  }

  configureApplicants(applicants: Array<any>): void {
    this.tableSize = this.applicants.length
    this.dataSource = new MatTableDataSource(applicants);
    this.initializePaginator()
  }

  navigateToApplicantView(applicant: any) {
    this.router.navigate(['applicants', applicant.id,'view']);
  }

  navigateToApplicantForm(applicant: any) {
    this.router.navigate(['applicants', applicant.id,'form']);
  }

  navigateToExtendedMembersListView(id: number) {
    this.router.navigate(['applicants', id,'extended-members', 'all']);
  }
}
