import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, BehaviorSubject, merge } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { OpenService, CommonService } from 'src/app/shared/services/open.service';
import { ToastrService } from 'ngx-toastr';

export class SearchFormBuilder {
  constructor(private formBuilder: FormBuilder) {
  }

  buildForm(search) {
    return this.buildSearchForm(search);
  }

  buildSearchForm(details) {
    details = details === undefined ? {'searchField': null} : details;
    return this.formBuilder.group({
      'searchField': [details.search]
    });
  }
}


export class ExtendedMemberDataSource extends DataSource<any> {

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
  selector: 'app-extended-member-list',
  templateUrl: './extended-member-list.component.html',
  styleUrls: ['./extended-member-list.component.css']
})
export class ExtendedMemberListComponent implements OnInit {

  displayedColumns = ['full_name', 'type', 'relation', 'contact', 'date_of_birth', 'date_joined', 'actions'];
  extended_members: Array<any> = [];
  dataSource: any;
  page: any;
  loadingState: any;
  tableSize: number;
  permission: any
  user: any;
  searchField: null;
  status: null;
  applicant_id: any;
  extended_member: any;
  formBuilder: SearchFormBuilder;
  ageLimitExceeded = false;
  form: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public openService: OpenService,
    public service: CommonService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService) { 
      this.formBuilder = new SearchFormBuilder(fb);
    }

  ngOnInit(): void {
    this.permission = this.openService.getPermissions();
    this.user = this.openService.getUser();
    this.transition(this.user);
    this.route.params.subscribe(
      (params) => {
        const id = +params['id'];
        this.applicant_id = id;
        this.initExtendedMembers(id);
      }
    )
  }

  transition(user: any) {
    this.service.switchHeader(user);
  }

  isParlour() {
    return this.permission == 'Parlour';
  }

  isConsultant() {
    return this.permission == 'Consultant';
  }

  initializePaginator() {
    this.dataSource.paginator = this.paginator;
  }

  onPaginatorChange(event: any) {
    this.page = event;
    this.dataSource = new ExtendedMemberDataSource(this.extended_members, this.page);
  }

  initExtendedMembers(id) {
    this.extended_members = [];
    const permission = this.permission;
    this.page = {
      'pageSize': 5,
      'pageIndex': 0,
    };

    this.loadingState = 'loading';
    this.dataSource = new ExtendedMemberDataSource([], this.page);

    this.openService.getUrl(`applicants/${id}/extended-members/all`)
      .subscribe(
        (extended_members: Array<any>) => {
          console.log(extended_members);
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
    this.router.navigate(['applicants', this.applicant_id, 'main-members', extended_members.id,'view']);
  }

  navigateToExtendedMemberForm(extended_member: any) {
    console.log(this.applicant_id);
    console.log(extended_member)
    this.router.navigate(['applicants', this.applicant_id, 'extended-members', extended_member.id,'form']);
  }

  navigateToExtendedMemberAddForm() {
    this.router.navigate(['applicants', this.applicant_id, 'extended-members', 'form']);
  }

  getBySearchField() {
    const formValue = this.form.value;

    this.openService.getUrl(`applicants/${this.applicant_id}/extended-members/all?search_string=${formValue["searchField"]}`)
      .subscribe(
        (main_members: Array<any>) => {
          this.status = null;
          this.searchField = formValue["searchField"];
          this.extended_members = main_members;
          this.configureMainMembers(main_members);
          this.loadingState = 'complete';
        },
        error => {
          console.log(error);
        });
  }

  ageLimitException(extended_member) {
    this.openService.put(`extended-members/${extended_member.id}/exception`, {"age_limit_exception": true})
      .subscribe(
        (main: any) => {
          extended_member = main;
          this.toastr.success('', 'Success!!!');
          // this.dataSource.data = this.dataSource.data.map((main) => {
  
          //   main !== main_member})
          // this.showExceptSuccess();
        },
      error => {

          this.toastr.error(error['message'], error['statusText'], {timeOut: 3000});
      });
  }

  getAgeLimitNotice() {
    this.openService.getUrl(`applicants/${this.applicant_id}/extended-members/all?notice=1`)
      .subscribe(
        (extended_members: Array<any>) => {
          if (extended_members) {
            this.extended_members = extended_members;
            this.configureMainMembers(extended_members);
            this.loadingState = 'complete';
          }
        },
        error => {
          console.log(error);
        });
  }

  confirmDeleteMember(extended_member: any) {
    this.extended_member = extended_member;
    const button = document.getElementById('deleteMember');
    button.click();
  }

  handleDelete() {
    this.openService.delete(`extended-members/${this.extended_member.id}/delete`)
      .subscribe(
        (extended_member: any) => {
          this.toastr.success('Applicant has been deleted!', 'Success');
        },
        error => {
          console.log(error);
        });
  }

  getCVSFile(event) {
    event.preventDefault();
    this.openService.getUrl(`applicants/${this.applicant_id}/extended-members/file`)
      .subscribe(
        (main_members: Array<any>) => {
          console.log("success.");
          // console.log(main_members);
          this.downloadFile(main_members);
          this.loadingState = 'complete';
        },
        error => {
          console.log(error);
        });
  }

  downloadFile(data: any) {
    const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
    const header = ["First Name", "Last Name", "ID Number", "Contact Number", "Policy Number", "Date Joined", "Status", "Cover", "Premium"]

    const csv = data.map((row) =>
      [row.first_name, row.first_name, row.id_number, row.contact, row.applicant.policy_num, row.date_joined, row.applicant.status, row.applicant.plan.cover, row.applicant.plan.premium].join(",")
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');
  
    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
  
    a.href = url;
    a.download = 'Applicants.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
