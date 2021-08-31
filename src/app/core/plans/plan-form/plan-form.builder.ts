import {Validators, FormBuilder} from '@angular/forms';
import { newPlan } from './../plans.model';


export class PlanFormBuilder {

  constructor(private formBuilder: FormBuilder) {}

  buildForm(building) {
    return this.buildPlan(building);
  }

  buildPlan(details) {
    details = details === undefined ? newPlan() : details;
    return this.formBuilder.group({
      'id': [details.id],
      'plan': [details.plan],
      'cover': [details.cover],
      'premium': [details.premium],
      'member_age_restriction': [details.member_age_restriction, Validators.required],
      'member_minimum_age': [details.member_minimum_age, Validators.maxLength(11)],
      'member_maximum_age': [details.member_maximum_age, Validators.maxLength(11)],
      'beneficiaries': [details.beneficiaries, [Validators.required, Validators.maxLength(100)]],
      'benefits': [details.notes],
      'consider_age': [details.consider_age],
      'has_benefits': [details.has_benefits]
    });
  }
}
