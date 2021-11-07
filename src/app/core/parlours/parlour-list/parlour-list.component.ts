import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, BehaviorSubject, merge } from 'rxjs';

import { map } from 'rxjs/operators';
import { OpenService } from 'src/app/shared/services/open.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


export class SMSFormBuilder {
  constructor(private formBuilder: FormBuilder) {
  }

  buildForm(search) {
    return this.buildSMSForm(search);
  }

  buildSMSForm(details) {
    details = details === undefined ? {'number_of_sms': null} : details;
    return this.formBuilder.group({
      'number_of_sms': [details.search]
    });
  }
}


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
  selector: 'app-parlour-list',
  templateUrl: './parlour-list.component.html',
  styleUrls: ['./parlour-list.component.css']
})
export class ParlourListComponent implements OnInit {

  displayedColumns = ['id', 'parlour_name', 'person_name', 'number', 'actions'];
  parlours: Array<any> = [];
  parlour: any;
  dataSource: any;
  page: any;
  loadingState: any;
  tableSize: number;
  formBuilder: SMSFormBuilder;
  form: FormGroup;
  numberOfSms: null;
  searchField: null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public openService: OpenService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public router: Router) {
      this.formBuilder = new SMSFormBuilder(fb);
     }

  ngOnInit(): void {
    this.initParlours();
    this.initSMSForm(this.numberOfSms);
  }

  initSMSForm(numberOfSms: string) {
    this.form = this.formBuilder.buildForm(numberOfSms);
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

    this.openService.getUrl(`parlours/active`)
      .subscribe(
        (parlours: Array<any>) => {
          this.parlours = parlours;
          this.configureParlours(parlours);
          this.loadingState = 'complete';
        },
        error => {
          console.log("error occured.");
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

  redirectArchivedParlourList() {
    const view = [`/parlours/archived-parlours`];
    this.router.navigate(view);
  }

  redirectPendingParlourList() {
    const view = [`/parlours/pending-parlours`];
    this.router.navigate(view);
  }

  navigateToPalourForm(parlour: any) {
    if (parlour){
      this.router.navigate(['parlours', parlour.id,'form']);
    }else {
      this.router.navigate(['parlours/form']);
    }
  }

  confirmSuspendParlour(parlour: any) {
    this.parlour = parlour;
    const button = document.getElementById('openSuspendModal');
    button.click();
  }

  suspendParlour(parlour: any) {
    this.openService.put(`parlours/${parlour.id}/suspend`, {'state': 3})
    .subscribe((result) => {
      this.toastr.success('Parlour was suspended successfully', '');
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

  unsuspendParlour(parlour: any) {
    this.openService.put(`parlours/${parlour.id}/active`, {'state': 1})
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

  openSMSModal(parlour: any) {
    this.parlour = parlour;
    const button = document.getElementById('openAddSMSModal');
    button.click();
  }

  addParlourSMS() {
    const formValue = this.form.value;
    this.openService.put(`parlours/${this.parlour.id}/action/sms`, formValue)
    .subscribe((result) => {
      this.toastr.success('Parlour SMS updated successfully.', '');
    },
    error => {
      const err = error["error"];
      this.toastr.error(err["description"], err['title']);
    });
  }
}
