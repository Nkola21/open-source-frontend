import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenService, CommonService } from 'src/app/shared/services/open.service';
import { Plan } from './../plans.model';
import { PlanFormBuilder } from './plan-form.builder';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.css']
})
export class PlanFormComponent implements OnInit {
  plan: Plan;
  formBuilder: PlanFormBuilder;
  form: FormGroup;
  main_checked = false;
  dependant_checked = false;
  extended_checked = false;
  additional_checked = false;
  benefits_checked = false;
  user: any;
  parlour_id: any;
  permission: any

  constructor(public openService: OpenService,
    public service: CommonService,
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
      this.formBuilder = new PlanFormBuilder(fb)
    }

  ngOnInit() {
    this.permission = this.openService.getPermissions();
    this.user = this.openService.getUser();
    this.transition(this.user);
    this.parlour_id = this.openService.getParlourId();
    this.route.params.subscribe(
      (params) => {
        const id = +params['id'];
        const parlour_id = +params['parlour_id'];
        if (id) {
        this.openService.getOne(`plans/${id}/get`)
          .subscribe(
            plan => {
              this.plan = plan as Plan;
              this.initForm(this.plan);
            },
            error => console.log(error));
        }else{
          this.initForm(this.plan);
        }
    });
  }

  transition(user: any) {
    this.service.switchHeader(user);
  }

  initForm(plan: Plan) {
    this.plan = plan;
    this.form = this.formBuilder.buildForm(this.plan);
  }

  submit() {
    let formValue = this.form.value;
    formValue["parlour_id"] = this.parlour_id
    formValue["main_members"] = 1

    if (this.plan) {
      this.openService.put(`plans/${this.plan.id}/update`, formValue)
        .subscribe(
          (plan: any) => {
            this.showSuccess();
          },
        error => {
          this.showError(error);
        });
    }else {
      this.openService.post(`plans`, formValue)
        .subscribe(
          (plan: any) => {
            this.showSuccess();
          },
        error => {
            this.showError(error);
        });
    }
  }

  showSuccess() {
    this.toastr.success('New Plan saved successfully!', 'Success!!!');
  }

  showError(error) {
    let err = error['error'];
    this.toastr.error(err['description'], error['title'], {timeOut: 3000});
  }

  getErrorDetails(error) {
    const body = error.json();
    let dets = '';
    for (const key of Object.keys(body['errors'])) {
      dets += `${key} - ${body['errors'][key]}\n`;
    }
    return dets;
  }

  goBack(event) {
    event.preventDefault();
    window.history.back();
  }

  mainMemberCheck(event) {
    this.main_checked = event.target.checked;
  }

  dependantCheck(event) {
    this.dependant_checked = event.target.checked;
  }

  extraCheck(event) {
    this.extended_checked = event.target.checked;
  }

  additionalCheck(event) {
    this.additional_checked = event.target.checked;
  }

  benefitsCheck(event) {
    this.benefits_checked = event.target.checked;
  }
}


