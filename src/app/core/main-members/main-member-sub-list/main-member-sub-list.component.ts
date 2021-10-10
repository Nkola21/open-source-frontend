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
  selector: 'app-main-member-sub-list',
  templateUrl: './main-member-sub-list.component.html',
  styleUrls: ['./main-member-sub-list.component.css']
})
export class MainMemberSubListComponent implements OnInit {

  displayedColumns = ['id_number', 'full_name', 'contact', 'date'];
  main_members: Array<any> = [];
  main_member: any;
  formBuilder: SearchFormBuilder;
  form: FormGroup;
  searchField: any;
  dataSource: any;
  page: any;
  loadingState: any;
  tableSize: number;
  parlour_id: any;
  months: any;
  original: any;
  period: any;

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
    }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        const id = +params['id'];
        if (id){
          this.parlour_id = id;
          this.initMainMembers(id);
        }
        this.initSearchForm(this.searchField);
      }
    )
  }

  initSearchForm(searchField: string) {
    this.form = this.formBuilder.buildForm(searchField);
  }

  initializePaginator() {
    this.dataSource.paginator = this.paginator;
  }

  getBySearchField() {
    let formValue = this.form.value;
    formValue['searchField'] = new Date(formValue["searchField"]).toLocaleDateString();

    this.openService.getUrl(`parlours/${this.parlour_id}/main-members/all?search_date=${formValue["searchField"]}`)
      .subscribe(
        (result: any) => {
          this.months = result.month;
          this.original = result.original;
          this.period = result.period;
          this.form.reset();
          const button = document.getElementById('openModal');
          button.click();
          this.loadingState = 'complete';
        },
        error => {
          console.log(error);
        });
  }

  onPaginatorChange(event: any) {
    this.page = event;
    this.dataSource = new MainMemberDataSource(this.main_members, this.page);
  }

  initMainMembers(id) {
    this.main_members = [];
    this.page = {
      'pageSize': 5,
      'pageIndex': 0,
    };

    this.loadingState = 'loading';
    this.dataSource = new MainMemberDataSource([], this.page);

    this.openService.getUrl(`parlours/${id}/main-members/all`)
      .subscribe(
        (main_members: Array<any>) => { 
          this.main_members = main_members;
          this.configureMainMembers(main_members);
          this.loadingState = 'complete';
        },
        error => {
          let err = error['error'];
          this.toastr.error(err['description'], error['title'], {timeOut: 3000});
        });
  }

  showExceptSuccess() {
    this.toastr.success('', 'Success!!!');
  }

  configureMainMembers(main_members: Array<any>): void {
    this.tableSize = this.main_members.length
    this.dataSource = new MatTableDataSource(main_members);
    this.initializePaginator()
  }

  showSuccess() {
    this.toastr.success('Success', 'Toastr fun!');
  }
}
