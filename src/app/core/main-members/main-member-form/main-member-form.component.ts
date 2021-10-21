import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OpenService } from 'src/app/shared/services/open.service';
import { MainMember, newMainMember, newApplicant } from './../main-members.models';
import { ToastrService } from 'ngx-toastr';


export class MainMemberFormBuilder {
  constructor(private formBuilder: FormBuilder) {
  }

  buildForm(main_member) {
    return this.buildMainMemberForm(main_member);
  }

  buildMainMemberForm(details) {
    details = details === undefined ? newMainMember() : details;
    return this.formBuilder.group({
      'id': [details.id],
      'plan': this.buildPlan(details.plan),
      'first_name': [details.first_name, [Validators.required, Validators.minLength(6)]],
      'last_name': [details.last_name, [Validators.required, Validators.minLength(6)]],
      'id_number': [details.id_number, [Validators.required]],
      'date_joined': [details.date_joined, [Validators.required]],
      'contact': [details.contact, [Validators.required]],
      'applicant': this.buildApplicantForm(details.applicant)
    });
  }

  buildPlan(details) {
    details = details === undefined ? {'id': null, 'name': null} : details;
    return this.formBuilder.group({
      'id': [details.id],
    });
  }

  buildApplicantForm(details) {
    details = details === undefined ? newApplicant() : details;
    return this.formBuilder.group({
        'id': [details.id],
        'policy_num': [details.policy_num, [Validators.required]],
        'document': [details.document, [Validators.required]],
        'cancelled': [details.cancelled, [Validators.required]],
        'status': [details.status, [Validators.required]],
        'date': [details.date, [Validators.required]],
        'address': [details.address, [Validators.required]]
    });
}
}


@Component({
  selector: 'app-main-member-form',
  templateUrl: './main-member-form.component.html',
  styleUrls: ['./main-member-form.component.css']
})
export class MainMemberFormComponent implements OnInit  {
  main_member: any;
  submitted = false;
  formBuilder: MainMemberFormBuilder;
  form: FormGroup;
  parlour_id: any;
  user: any;
  plans: Array<any> = [];

  constructor(public openService: OpenService,
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService) {
      this.formBuilder = new MainMemberFormBuilder(fb);
     }

  ngOnInit(): void {
    this.parlour_id = this.openService.getParlourId();
    this.user = this.openService.getUser()
    this.route.params.subscribe(
      (params) => {
        const id = +params['id'];
        if (id){
          this.getMainMember(id);
        }else{
          this.initPlans();
          this.initForm(this.main_member);
        }
      }
    )
  }

  initForm(main_member: MainMember) {
    this.main_member = main_member;
    this.form = this.formBuilder.buildForm(this.main_member);
  }

  getMainMember(id) {
    this.openService.getOne(`main-members/${id}/get`)
      .subscribe(
        main_member => {
          console.log("Main member: ", main_member);
          this.main_member = main_member;
          this.initPlans();
          this.initForm(this.main_member);
        },
        error => console.log("ERROR"));
  }

  submit() {
    const formValue = this.form.value;
    formValue["parlour_id"] = this.parlour_id;

    if (this.main_member) {
      this.openService.put(`main-members/${this.main_member.id}/update`, formValue)
        .subscribe(
          (user: any) => {
            this.submitted = true;
            this.showSuccess();
          },
        error => {
          let err = error['error'];
          this.toastr.error(err['description'], error['title'], {timeOut: 3000});
        });
    }else {
      this.openService.post(`consultants/${this.user.id}/main-members`, formValue)
        .subscribe(
          (user: any) => {
            this.showSuccess();
            this.submitted = true;
          },
        error => {
          let err = error['error'];
          this.toastr.error(err['description'], error['title'], {timeOut: 3000});
        });
    }
  }

  showSuccess() {
    this.toastr.success('New Applicant saved successfully!', 'Success!!!');
  }

  goBack(event) {
    event.preventDefault();
    window.history.back();
  }

  getAge() {
    if (this.main_member) {
      const year_digits = this.main_member.id_number ? this.main_member.id_number.substr(0,2) : null;

      let this_year = new Date().getFullYear().toString().substr(2,3);
      if (year_digits) {
          if (parseInt(year_digits) >= 0 && parseInt(year_digits) < 35) {
            const age = parseInt(this_year) - parseInt(year_digits);
            return age + " years old";
          }
          const year_born = "19" + year_digits;
          this_year = new Date().getFullYear().toString()

          const age = parseInt(this_year) - parseInt(year_born)
          return age + " years old";
      }
    }
    return null;
  }

  showError(error) {
    let errors = {};
    errors = error.json();
    const description = errors.hasOwnProperty('errors') ? this.getErrorDetails(error) : errors['description'];
    this.toastr.error(description, errors['title'], {timeOut: 3000});
    // this.toastr.error('Error', 'Major Error', {
    //   timeOut: 3000,
    // });
  }

  getErrorDetails(error) {
    const body = error.json();
    let dets = '';
    for (const key of Object.keys(body['errors'])) {
      dets += `${key} - ${body['errors'][key]}\n`;
    }
    return dets;
  }

  initPlans() {
    this.openService.getUrl(`parlours/${this.parlour_id}/plans/all`)
    .subscribe((plans: any) => {
      this.plans = plans.map((plan: any) => {
          return {
            id: plan.id,
            name: plan.plan
          };
      });
    },
    error => {
      this.showError(error);
    });
  }
}
