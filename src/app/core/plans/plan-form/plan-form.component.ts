import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  constructor(
    public openService: OpenService,
    private route: ActivatedRoute,
    fb: FormBuilder,
  ) { 
      this.formBuilder = new PlanFormBuilder(fb)
    }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        const id = +params['id'];
        this.openService.getOne('plans', id)
          .subscribe(
            plan => {
              this.plan = plan as Plan;
            },
            error => console.log("ERROR"));
      });
  }
}


