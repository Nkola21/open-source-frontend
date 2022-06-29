import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OpenService, CommonService } from 'src/app/shared/services/open.service';
import { ToastrService } from 'ngx-toastr';
import { Consultant, newConsultant } from './../consultants.models'


export class ConsultantFormBuilder {
  constructor(private formBuilder: FormBuilder) {
  }

  buildForm(parlour) {
    return this.buildConsultantForm(parlour);
  }

  buildConsultantForm(details) {
    details = details === undefined ? newConsultant() : details;
    return this.formBuilder.group({
      'id': [details.id],
      'first_name': [details.first_name, [Validators.required]],
      'last_name': [details.last_name, [Validators.required]],
      'email': [details.email, [Validators.required, Validators.email]],
      'username': [details.username, [Validators.required]],
      'branch': [details.branch, [Validators.required]],
      'number': [details.number, [Validators.required]]
    });
  }
}


@Component({
  selector: 'app-consultant-form',
  templateUrl: './consultant-form.component.html',
  styleUrls: ['./consultant-form.component.css']
})
export class ConsultantFormComponent implements OnInit {

  consultant: any;
  formBuilder: ConsultantFormBuilder;
  form: FormGroup;
  user: any;
  parlour_id: number;
  permission: any

  constructor(public openService: OpenService,
    public service: CommonService,
    private route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder) {
      this.formBuilder = new ConsultantFormBuilder(fb);
     }

  ngOnInit(): void {
    this.permission = this.openService.getPermissions();
    this.user = this.openService.getUser();
    this.transition(this.user);
    this.parlour_id = this.user.parlour.id;
    this.route.params.subscribe(
      (params) => {
        const id = +params['id'];
        if (id){
          this.getConsultant(id);
        }else{
          this.initForm(this.consultant);
        }
      }
    )
  }

  transition(user: any) {
    this.service.switchHeader(user);
  }
  
  getConsultant(id) {
    this.openService.getOne(`consultants/${id}`)
      .subscribe(
        consultant => {
          this.consultant = consultant
          this.initForm(this.consultant);
        },
        error => console.log("ERROR"));
  }

  initForm(consultant: Consultant) {
    this.consultant = consultant;
    this.form = this.formBuilder.buildForm(this.consultant);
  }

  confirmConsultant() {
    const button = document.getElementById('openModal');
    button.click();
  }

  submit() {
    let formValue = this.form.value;
    formValue["parlour_id"] = this.parlour_id

    if (this.consultant) {
      this.openService.put(`consultants/${this.consultant.id}/update`, formValue)
        .subscribe(
          (user: any) => {
            this.showSuccess();
          },
        error => {
          this.showError(error);
        });
    }else {
      this.openService.post(`consultants`, formValue)
        .subscribe(
          (user: any) => {
            this.consultant = user;
            this.confirmConsultant();
            this.showSuccess();
            this.form.reset();
          },
        error => {
            this.showError(error);
        });
    }
  }

  goBack(event) {
    event.preventDefault();
    window.history.back();
  }

  showSuccess() {
    this.toastr.success('New Consultant saved successfully!', 'Success!!!');
  }

  showError(error) {
    let err = error['error'];
      this.toastr.error(err['description'], error['title'], {timeOut: 3000});
  }
}
