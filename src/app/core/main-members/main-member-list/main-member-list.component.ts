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
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


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
  templateUrl: './main-member-list.component.html',
  styleUrls: ['./main-member-list.component.css']
})
export class MainMemberListComponent implements OnInit {

  displayedColumns = ['full_name', 'id_number', 'contact', 'extended_members', 'premium', 'policy_num', 'policy', 'date_joined', 'status', 'actions'];
  main_members: Array<any> = [];
  main_member: any;
  formBuilder: SearchFormBuilder;
  form: FormGroup;
  searchField: null;
  dataSource: any;
  page: any;
  loadingState: any;
  tableSize: number;
  permission: any
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
    this.initSearchForm(this.searchField);
    this.initMainMembers(this.user.id)
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

    this.openService.getUrl(`${permission.toLowerCase()}s/${id}/main-members/all`)
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
    this.router.navigate(['main-members', main_member.id,'view']);
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

  confirmDeleteApplicant(main_member) {
    this.main_member = main_member;
    const button = document.getElementById('showModal');
    button.click();
  }

  handleDelete(main_member) {
    this.openService.delete(`main-members/${main_member.id}/delete`)
      .subscribe(
        (consultant: any) => {

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
    this.openService.getUrl(`${this.permission.toLowerCase()}s/${this.user.id}/main-members/all?status=${status}`)
      .subscribe(
        (main_members: Array<any>) => {         
          this.main_members = main_members;
          this.configureMainMembers(main_members);
          this.loadingState = 'complete';
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

}
