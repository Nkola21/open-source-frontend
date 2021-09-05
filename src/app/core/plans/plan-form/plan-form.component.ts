import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenService } from 'src/app/shared/services/open.service';
import { Plan } from './../plans.model';
import { PlanFormBuilder } from './plan-form.builder';


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
  extra_checked = false;
  additional_checked = false;
  benefits_checked = false;
  
  constructor(public openService: OpenService,
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder
  ) { 
      this.formBuilder = new PlanFormBuilder(fb)
    }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        const id = +params['id'];
        if (id) {
        this.openService.getOne(`plans/${id}`)
          .subscribe(
            plan => {
              this.plan = plan as Plan;
              this.initForm(this.plan);
            },
            error => console.log(error));
        }else {
          this.initForm(this.plan);
        }
    });
  }

  initForm(plan: Plan) {
    this.plan = plan;
    this.form = this.formBuilder.buildForm(this.plan);
  }

  submit() {
    const formValue = this.form.value;
    console.log(formValue);
    if (this.plan) {
      this.openService.put(`plans/${this.plan.id}/update`, formValue)
        .subscribe(
          (plan: any) => {
            
          },
        error => {
            console.log(error);
        });
    }else {
      this.openService.post(`plans`, formValue)
        .subscribe(
          (plan: any) => {

          },
        error => {
            console.log(error);
        });
    }
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
    this.extra_checked = event.target.checked;
  }

  additionalCheck(event) {
    this.additional_checked = event.target.checked;
  }

  benefitsCheck(event) {
    this.benefits_checked = event.target.checked;
  }
}


