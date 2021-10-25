import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, BehaviorSubject, merge } from 'rxjs';

import { map } from 'rxjs/operators';
import { OpenService } from 'src/app/shared/services/open.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { MainMember } from '../main-members.models';
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


export class SMSFormBuilder {
  constructor(private formBuilder: FormBuilder, parlour?: any) {
  }

  buildForm(smsFields, parlour?: any) {
    return this.buildSMSForm(smsFields, parlour);
  }

  buildSMSForm(details, parlour?: any) {
    const from = parlour !== undefined ? parlour.parlour_name : null
    // console.log(parlour);
    details = details === undefined ? {'message': null, 'from': null, 'to': null} : details;
    return this.formBuilder.group({
      'message': [details.message, [Validators.required, Validators.minLength(2)]],
      'from': [{value: from, disabled: true}, [Validators.required]],
      'to': [details.to, [Validators.required]]
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
  templateUrl: './main-member-list.component.html',
  styleUrls: ['./main-member-list.component.css']
})
export class MainMemberListComponent implements OnInit {

  displayedColumns = ['full_name', 'id_number', 'contact', 'extended_members', 'premium', 'policy_num', 'policy', 'date_joined', 'status', 'actions'];
  main_members: Array<any> = [];
  main_member: any;
  formBuilder: SearchFormBuilder;
  smsFormBuilder: SMSFormBuilder;
  form: FormGroup;
  smsForm: FormGroup;
  searchField: null;
  smsFields: null;
  status: null;
  dataSource: any;
  page: any;
  loadingState: any;
  tableSize: number;
  permission: any;
  parlour_id: any;
  parlour: any;
  ageLimitExceeded = false;
  user: any;
  message_parts: number;
  message_length: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("dataBlock") block: ElementRef;

  constructor(
    public openService: OpenService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private fc: FormBuilder,
    private toastr: ToastrService) { 
      this.formBuilder = new SearchFormBuilder(fb);
      this.smsFormBuilder = new SMSFormBuilder(fc);
    }

  ngOnInit(): void {
    this.permission = this.openService.getPermissions();
    this.user = this.openService.getUser();
    if (this.permission == "Consultant") {
      this.parlour = this.user.parlour;
    }
    this.parlour_id = this.openService.getParlourId()
    this.initParlour(this.parlour_id);
    this.initSearchForm(this.searchField);

    this.initSMSForm(this.smsFields, this.parlour);
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

  initSMSForm(smsFields, parlour?: any) {
    this.smsForm = this.smsFormBuilder.buildForm(smsFields, parlour);
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

    this.openService.getUrl(`${permission.toLowerCase()}s/${id}/main-members/all`)
      .subscribe(
        (main_members: Array<any>) => { 
          this.status = null;
          this.searchField = null;
          this.main_members = main_members;
          this.isAgeLimitExceeded(main_members);
          this.configureMainMembers(main_members);
          this.loadingState = 'complete';
        },
        error => {
          let err = error['error'];
          this.toastr.error(err['description'], error['title'], {timeOut: 3000});
        });
  }

  ageLimitException(main_member?: MainMember) {
    this.openService.put(`main-members/${main_member.id}/exception`, {"age_limit_exception": true})
      .subscribe(
        (main: any) => {
          main_member = main;
          this.initMainMembers(this.user.id);
          this.showExceptSuccess();
        },
      error => {
          let err = error['error'];
          this.toastr.error(err['description'], error['title'], {timeOut: 3000});
      });
  }

  showExceptSuccess() {
    this.toastr.success('', 'Success!!!');
  }

  initParlour(parlour_id) {
    this.openService.getOne(`parlours/${parlour_id}`)
      .subscribe(
        (parlour: any) => {
          this.parlour = parlour;
        },
        error => {
          console.log("error occured.");
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

  navigateToMainMemberAddForm() {
    this.router.navigate(['main-members', 'form']);
  }

  navigateToMainMemberForm(main_member: any) {
    this.router.navigate(['main-members', main_member.id,'form']);
  }

  navigateToExtendedMembersListView(id: number) {
    this.router.navigate(['applicants', id,'extended-members', 'all']);
  }

  
  navigateToPaymentsForm(id: number) {
    this.router.navigate(['applicants', id,'extended-members', 'all']);
  }

  confirmDeleteApplicant(main_member: any) {
    this.main_member = main_member;
    const button = document.getElementById('deleteApplicant');
    button.click();
  }

  handleDelete(main_member) {
    this.openService.delete(`main-members/${main_member.id}/delete`)
      .subscribe(
        (main: any) => {
          this.main_members = this.main_members.filter(val => { 
            if (val.id != main_member.id) {
              return val;
            }
          });
          this.configureMainMembers(this.main_members);
          this.initializePaginator()
          this.toastr.success('Main member has been deleted!', 'Success');
        },
        error => {
          console.log(error);
        });
  }

  isAgeLimitExceeded(members) {
    for (let member of members) {
      if(member.age_limit_exceeded) {
        this.ageLimitExceeded = true;
        break;
      }
    }
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
    this.openService.getUrl(`${this.permission.toLowerCase()}s/${this.user.id}/main-members/all?status=${status}`)
      .subscribe(
        (main_members: Array<any>) => {
          this.status = status;
          this.searchField = null;
          this.main_members = main_members;
          this.configureMainMembers(main_members);
          this.loadingState = 'complete';
        },
        error => {
          console.log(error);
        });
  }

  getAgeLimitNotice() {
    this.openService.getUrl(`${this.permission.toLowerCase()}s/${this.user.id}/main-members/all?notice=1`)
      .subscribe(
        (main_members: Array<any>) => {
          if (main_members) {
            this.main_members = main_members;
            this.configureMainMembers(main_members);
            this.loadingState = 'complete';
          }
        },
        error => {
          console.log(error);
        });
  }

  getBySearchField() {
    const formValue = this.form.value;

    this.openService.getUrl(`${this.permission.toLowerCase()}s/${this.user.id}/main-members/all?search_string=${formValue["searchField"]}`)
      .subscribe(
        (main_members: Array<any>) => {
          this.status = null;
          this.searchField = formValue["searchField"];
          this.main_members = main_members;
          this.configureMainMembers(main_members);
          this.loadingState = 'complete';
        },
        error => {
          console.log(error);
        });
  }

  showSuccess() {
    this.toastr.success('Success', 'Toastr fun!');
  }

  counter(value: number) {
    this.message_parts = Math.ceil(value/160);
    return 160 * this.message_parts; 
  }

  getCVSFile(event) {
    event.preventDefault();
    this.openService.getUrl(`consultants/${this.user.id}/export_to_csv`)
      .subscribe(
        (main_members: Array<any>) => {
          this.downloadFile(main_members);
          this.loadingState = 'complete';
        },
        error => {
          console.log(error);
        });
  }

  downloadFile(data: any) {
    const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
    const header = ["First Name", "Last Name", "ID Number", "Contact Number", "Policy Number", "Date Joined", "Status", "Cover", "Premium", "Underwriter Premium", "Relationship"]

    const csv = data.map((row) =>
      [
        row.first_name,
        row.last_name,
        row.id_number == undefined ? row.date_of_birth :row.id_number,
        row.contact == undefined ? row.number : row.contact,
        row.applicant.policy_num,
        row.date_joined == undefined ? null : row.date_joined,
        row.applicant.status,
        row.applicant.plan.cover,
        row.applicant.plan.premium,
        row.applicant.plan.underwriter_premium,
        row.relation_to_main_member == undefined ? null : row.relation_to_main_member

      ].join(",")
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');
  
    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/xlsx' });
    const url = window.URL.createObjectURL(blob);
  
    a.href = url;
    a.download = 'Applicants.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  sendSMS() {
    let formValues = this.smsForm.value;
    formValues['state'] = this.status;
    formValues['search_string'] = this.searchField;
    formValues['parlour_id'] = this.parlour_id;

    this.openService.post(`main-members/send-sms`, formValues)
      .subscribe(
        (result: Array<any>) => {
          this.toastr.success('SMSes sent successfully!', '');
          this.parlour = result['parlour'];
        },
        error => {
          let err = error['error'];
          this.toastr.error(err['description'], error['title'], {timeOut: 3000});
        });
  }

  getNumberOfSMS() {
    return this.parlour !== undefined && this.parlour.number_of_sms !== undefined ? this.parlour.number_of_sms : 0;
  }

}
