import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, BehaviorSubject, merge } from 'rxjs';

import { map } from 'rxjs/operators';
import { OpenService } from './../../../shared/services/open.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { saveAs } from 'file-saver';


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
  templateUrl: './main-member-archived-list.component.html',
  styleUrls: ['./main-member-archived-list.component.css']
})
export class MainMemberArchivedListComponent implements OnInit {

  displayedColumns = ['full_name', 'id_number', 'contact', 'extended_members', 'premium', 'policy_num', 'policy', 'date_joined', 'status', 'actions'];
  main_members: Array<any> = [];
  main_member: any;
  formBuilder: SearchFormBuilder;
  form: FormGroup;
  searchField: null;
  status: null;
  dataSource: any;
  page: any;
  loadingState: any;
  tableSize: number;
  permission: any
  parlour_id: any
  user: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("dataBlock") block: ElementRef;

  constructor(
    public openService: OpenService,
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
    this.parlour_id = this.openService.getParlourId()

    this.initSearchForm(this.searchField);
    this.initMainMembers(this.user.id)
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
    this.dataSource = new MainMemberDataSource(this.main_members, this.page);
  }

  initSearchForm(searchField: string) {
    this.form = this.formBuilder.buildForm(searchField);
  }

  initMainMembers(id) {
    this.main_members = [];
    const permission = this.permission;
    this.page = {
      'pageSize': 5,
      'pageIndex': 0,
    };

    this.loadingState = 'loading';
    this.dataSource = new MainMemberDataSource([], this.page);

    this.openService.getUrl(`${permission.toLowerCase()}s/${id}/main-members/archived`)
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

  navigateToPaymentForm(main_member: any) {
    'applicants/:id/payment/form'
    this.router.navigate(['applicants', main_member.id, 'payment', 'form']);
  }

  navigateToMainMemberForm(main_member: any) {
    this.router.navigate(['main-members', main_member.id,'form']);
  }

  navigateToExtendedMembersListView(id: number) {
    this.router.navigate(['applicants', id,'extended-members', 'all']);
  }

  confirmRestoreApplicant(main_member: any) {
    this.main_member = main_member;
    const button = document.getElementById('restoreApplicant');
    button.click();
  }

  handleRestore(main_member) {
    main_member.state=1;
    this.openService.put(`main-members/${main_member.id}/restore`, main_member)
      .subscribe(
        (main_member: any) => {
          this.toastr.success('Applicant has been restored!', 'Success');
        },
        error => {
          this.toastr.error(error['message'], error['statusText']);
        });
  }

  confirmDeleteApplicant(main_member: any) {
    this.main_member = main_member;
    const button = document.getElementById('deleteApplicant');
    button.click();
  }

  handleDelete(main_member) {
    this.openService.delete(`main-members/${main_member.id}/delete`)
      .subscribe(
        (main_member: any) => {
          this.toastr.success('Applicant has been deleted!', 'Success');
        },
        error => {
          console.log(error);
        });
  }

  getByPaymentPaid() {
    this.getByPaymentStatus('paid');  
  }

  getByPaymentUnpaid() {
    this.getByPaymentStatus('unpaid');
  }

  getByPaymentSkipped() {
    this.getByPaymentStatus('Skipped');
  }
  
  getByPaymentLapsed() {
    this.getByPaymentStatus('lapsed');
  }

  getByPaymentStatus(status) {
    this.openService.getUrl(`${this.permission.toLowerCase()}s/${this.user.id}/main-members/archived?status=${status}`)
      .subscribe(
        (main_members: Array<any>) => {
          console.log(main_members);
          this.status = status;
          this.main_members = main_members;
          this.configureMainMembers(main_members);
          this.loadingState = 'complete';
        },
        error => {
          let err = error['error'];
          this.toastr.error(err['description'], error['title'], {timeOut: 3000});
        });
  }

  getBySearchField() {
    const formValue = this.form.value;

    this.openService.getUrl(`${this.permission.toLowerCase()}s/${this.user.id}/main-members/archived?search_string=${formValue["searchField"]}`)
      .subscribe(
        (main_members: Array<any>) => {
          this.status = null;
          this.searchField = formValue["searchField"];
          this.main_members = main_members;
          this.configureMainMembers(main_members);
          this.loadingState = 'complete';
        },
        error => {
          let err = error['error'];
          this.toastr.error(err['description'], error['title'], {timeOut: 3000});
        });
  }

  showSuccess() {
    this.toastr.success('Success', 'Toastr fun!');
  }

  getCVSFile(event) {
    event.preventDefault();
    this.openService.getUrl(`parlours/${this.parlour_id}/main-members/file`)
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
