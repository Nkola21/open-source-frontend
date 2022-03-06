import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpenService, CommonService } from 'src/app/shared/services/open.service';
import { ToastrService } from 'ngx-toastr';


export class ImportMembersFormBuilder {
  constructor(private formBuilder: FormBuilder) {
  }

  buildForm() {
    return this.buildImportMembersForm();
  }

  buildImportMembersForm() {
    let details = {'plan_id': null, 'file_upload': null};
    return this.formBuilder.group({
      'plan_id': [details.plan_id, [Validators.required]],
      'file_upload': [details.file_upload, [Validators.required]]
    });
  }
}


@Component({
  selector: 'app-main-member-bulk-add',
  templateUrl: './main-member-bulk-add.component.html',
  styleUrls: ['./main-member-bulk-add.component.css']
})
export class MainMemberBulkAddComponent implements OnInit {
  parlour_id: any;
  user: any;
  selectedFile: any;
  plans: any[];
  plan_id: any;
  formBuilder: ImportMembersFormBuilder;
  form: FormGroup;
  loaded = false;
  submitted = false;
  datasource: any

  constructor(public openService: OpenService,
    public service: CommonService,
    public router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService) { 
      this.formBuilder = new ImportMembersFormBuilder(fb);
    }

  ngOnInit(): void {
    this.parlour_id = this.openService.getParlourId();
    this.user = this.openService.getUser()
    this.initPlans();
    this.initImportMembersForm();
  }

  initImportMembersForm() {
    this.form = this.formBuilder.buildForm();
  }

  initPlans() {
    this.plans = [];

    this.openService.getUrl(`parlours/${this.parlour_id}/plans/all`)
      .subscribe(
        (plans: Array<any>) => {
          this.plans = plans;
        },
        error => {
          console.log(error);
        });
  }

  onFileSelected = (target: any) => {
    const file = target.files.item(0);
    this.selectedFile = file;
  }

  downloadFailedEntries() {
    
    this.openService.post(`actions/download_failed_members`, this.datasource)
    .subscribe(
      (res: any) => {
        let queryString= `filename=${res.filename}`;
        const anchor = <HTMLAnchorElement>document.getElementById("downloadExcel")
        anchor.href = `${this.openService.getBaseUrl()}/members/actions/export_to_excel?${queryString}`;
        anchor.click()

        this.showSuccess();
      },
    error => {
      this.toastr.error("Encountered issue while downloading", "Error", {timeOut: 3000});
    });
  }

  importMembers() {
    const formValue = this.form
    const plan_id = formValue.controls.plan_id.value;
    
    if (this.selectedFile === null) {
      this.toastr.error('Select file to upload first and then click import', 'No file selected', {timeOut: 5000});
    } else {
      // This will read the content of the uploaded file and post to adminService
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        this.submitted = true;
        let content = JSON.stringify(fileReader.result).split('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,')[1]
        this.openService.postFile(`consultants/${this.user.id}/actions/import_members`, {'plan': plan_id, 'csv': content})
        .subscribe(result => {
          let table_data = [];
          if (Object(result).length > 0) {
            for(let res of Object(result)) {
              // console.log(res.data);
              table_data.push({
                  'first_name': res.data[0],
                  'last_name': res.data[1],
                  'id_number': res.data[2],
                  'contact': res.data[3],
                  'date_joined': res.data[4],
                  'waiting_period': res.data[5],
                  'physical_address': res.data[6],
                  'policy_num': res.data[7],
                  'type_member': res.data[8],
                  'relation': res.data[9],
                  'reason': res.error});
            }
            this.datasource = <Element[]>table_data;
          }

          document.getElementById("loadMembersModal").style.visibility = "false";
          if (table_data.length == 0) {
            this.showSuccess();
          }else{
            this.submitted = false;
            this.toastr.error("Some members failed to be added", "Error", {timeOut: 3000});  
          }
          this.loaded = true;
        },
        error => {
          this.submitted = false;
          document.getElementById("loadMembersModal").style.visibility = "false";
          this.toastr.error("Encountered error while importing data", "Error", {timeOut: 3000});
        });
      };

      // this.toastr.success('', 'Uploading File', {timeOut: 5000});
      fileReader.readAsDataURL(this.selectedFile);

    }
  }

  showSuccess() {
    this.toastr.success('All members were added succesfully!', '');
  }

  goBack(event) {
    event.preventDefault();
    window.history.back();
  }
}
