import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, BehaviorSubject, merge } from 'rxjs';

import { map } from 'rxjs/operators';
import { OpenService, CommonService } from 'src/app/shared/services/open.service';
import { ToastrService } from 'ngx-toastr';


export class ConsultantDataSource extends DataSource<any> {



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
  selector: 'app-consultant-list',
  templateUrl: './consultant-list.component.html',
  styleUrls: ['./consultant-list.component.css']
})
export class ConsultantListComponent implements OnInit {

  displayedColumns = ['full_name', 'number', 'branch', 'email', 'actions'];
  consultants: Array<any> = [];
  dataSource: any;
  page: any;
  loadingState: any;
  tableSize: number;
  consultant: any;
  user: any;
  permission: any

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public openService: OpenService,
    public service: CommonService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.user = this.openService.getUser();
    this.permission = this.openService.getPermissions();
    this.transition(this.user);
    this.route.params.subscribe(
      (params) => {
        const id = +params['parlour_id'];
        this.initConsultants(id);
      }
    )
  }

  transition(user: any) {
    this.service.switchHeader(user);
  }

  initializePaginator() {
    this.dataSource.paginator = this.paginator;
  }

  onPaginatorChange(event: any) {
    this.page = event;
    this.dataSource = new ConsultantDataSource(this.consultants, this.page);
  }

  initConsultants(id) {
    this.consultants = [];
    this.page = {
      'pageSize': 5,
      'pageIndex': 0,
    };

    this.loadingState = 'loading';
    this.dataSource = new ConsultantDataSource([], this.page);

    this.openService.getUrl(`parlours/${this.user.id}/consultants/`)
      .subscribe(
        (consultants: Array<any>) => {
          this.consultants = consultants;
          this.configureConsultants(consultants.reverse());
          this.loadingState = 'complete';
        },
        error => {
          console.log(error);
        });
  }

  configureConsultants(consultants: Array<any>): void {
    this.tableSize = this.consultants.length
    this.dataSource = new MatTableDataSource(consultants);
    this.initializePaginator()
  }

  navigateToConsultantView(consultant: any) {
    this.router.navigate(['consultants', consultant.id,'view']);
  }

  navigateToConsultantForm(consultant: any) {
    this.router.navigate(['consultants', consultant.id,'form']);
  }

  confirmDeleteConsultant(consultant: any) {
    this.consultant = consultant;
    const button = document.getElementById('deleteConsultant');
    button.click();
  }

  handleDelete(consultant) {
    this.openService.delete(`consultants/${consultant.id}/delete`)
      .subscribe(
        (consultant: any) => {
          this.toastr.success("Successfully deleted consultant.", "Success")
          this.consultants = this.consultants.filter(val => { 
            if (val.id != consultant.id) {
              return val;
            }
          });
          this.configureConsultants(this.consultants.reverse());
          this.initializePaginator()
        },
        error => {
          console.log(error);
        });
  }
}
