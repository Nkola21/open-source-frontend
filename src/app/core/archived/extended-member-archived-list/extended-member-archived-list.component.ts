import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
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


const relation_types = {
  4: 'Spouse',
  1: 'Dependant',
  2: 'Extended Member',
  3: 'Additional Extended Member',
  0: 'Select Member Type'
}


const relationships = {
  12: 'Child',
  1: 'Parent',
  2: 'Brother',
  3: 'Sister',
  4: 'Nephew',
  5: 'Niece',
  6: 'Aunt',
  7: 'Uncle',
  8: 'Grand Parent',
  9: 'Wife',
  10: 'Husband',
  11: 'Cousin',
  0: 'Relationship to Main Member'
}


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
  selector: 'app-extended-member-archived-list',
  templateUrl: './extended-member-archived-list.component.html',
  styleUrls: ['./extended-member-archived-list.component.css']
})
export class ExtendedMemberArchivedListComponent implements OnInit {

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
    private toastr: ToastrService,
    private changeDetectorRefs: ChangeDetectorRef) { 
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

    this.openService.getUrl(`applicants/${id}/extended-members/archived`)
      .subscribe(
        (extended_members: Array<any>) => {
          this.extended_members = extended_members;
          this.configureExtendedMembers(extended_members.reverse());
          this.loadingState = 'complete';
        },
        error => {
          console.log(error);
        });
  }

  configureExtendedMembers(extended_members: Array<any>): void {
    this.tableSize = this.extended_members.length
    this.dataSource = new MatTableDataSource(extended_members);
    this.initializePaginator()
  }

  navigateToExtendedMemberView(extended_members: any) {
    this.router.navigate(['applicants', this.applicant_id, 'main-members', extended_members.id,'view']);
  }

  navigateToExtendedMemberForm(extended_member: any) {
    this.router.navigate(['applicants', this.applicant_id, 'extended-members', extended_member.id,'form']);
  }

  navigateToExtendedMemberAddForm() {
    this.router.navigate(['applicants', this.applicant_id, 'extended-members', 'form']);
  }

  getBySearchField() {
    const formValue = this.form.value;

    this.openService.getUrl(`applicants/${this.applicant_id}/extended-members/all?search_string=${formValue["searchField"]}`)
      .subscribe(
        (extended_members: Array<any>) => {
          this.status = null;
          this.searchField = formValue["searchField"];
          this.extended_members = extended_members;
          this.configureExtendedMembers(extended_members.reverse());
          this.loadingState = 'complete';
        },
        error => {
          console.log(error);
        });
  }

  canPromote(extended_member) {
    return extended_member.is_main_member_deceased;
  }

  ageLimitException(extended_member) {
    this.openService.put(`extended-members/${extended_member.id}/exception`, {"age_limit_exception": true})
      .subscribe(
        (main: any) => {
          extended_member = main;
          this.toastr.success('', 'Success!!!');
          this.initExtendedMembers(this.applicant_id);
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
            this.configureExtendedMembers(extended_members.reverse());
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

  confirmPromoteMember(extended_member: any) {
    this.extended_member = extended_member;
    const button = document.getElementById('promoteMember');
    button.click();
  }

  handleDelete() {
    this.openService.delete(`extended-members/${this.extended_member.id}/delete`)
      .subscribe(
        (extended_member: any) => {
          this.extended_members = this.extended_members.filter(val => {
            if (val.id != extended_member.id) {
              return val;
            }
          });
          this.configureExtendedMembers(this.extended_members.reverse());
          this.toastr.success('Applicant has been deleted!', 'Success');
        },
        error => {
          console.log(error);
        });
  }

  handleRestore(extended_member) {
    extended_member.state=1;
    this.openService.put(`extended-members/${extended_member.id}/restore`, extended_member)
      .subscribe(
        (extended_member: any) => {
          this.extended_members = this.extended_members.filter(val => { 
            if (val.id != extended_member.id) {
              return val;
            }
          });
          this.configureExtendedMembers(this.extended_members.reverse());
          this.toastr.success('Applicant has been restored!', 'Success');
          this.changeDetectorRefs.detectChanges();
        },
        error => {
          this.toastr.error(error['message'], error['statusText']);
        });
  }

  openRestoreModal(extended_member) {
    this.extended_member = extended_member;
    const button = document.getElementById('restoreExtendedMemberModalBtn');
    button.click();
  }

  getCVSFile(event) {
    event.preventDefault();
    this.openService.getUrl(`applicants/${this.applicant_id}/extended-members/file`)
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

  getMemberType(memberType) {
    return memberType ? relation_types[memberType] : null;
  }

  getMemberRelationship(memberRelationship) {
    return memberRelationship ? relationships[memberRelationship] : null;
  }

  promoteToMainMember() {
    this.openService.post(`extended-members/${this.extended_member.id}/promote`, this.extended_member)
      .subscribe(
        () => {
          this.toastr.success('Extended member has been promoted to main member.', 'Success!!!');
        },
      error => {
        let err = error['error'];
        this.toastr.error(err['description'], error['title'], {timeOut: 3000});
      });
    }
}
