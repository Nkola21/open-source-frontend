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
      'name': [details.name, [Validators.required]],
      'cover': [details.cover],
      'premium': [details.premium, [Validators.required]],
      'underwriter_premium': [details.underwriter_premium],
      'main_members': [{value: 1, disabled: true}, [Validators.required]],
      'member_age_restriction': [details.member_age_restriction],
      'member_minimum_age': [details.member_minimum_age],
      'member_maximum_age': [details.member_maximum_age],
      'spouse': [details.spouse],
      'spouse_age_restriction': [details.spouse_age_restriction],
      'spouse_minimum_age': [details.spouse_minimum_age],
      'spouse_maximum_age': [details.spouse_maximum_age],
      'extended_members': [details.extended_members],
      'extended_age_restriction': [details.extended_age_restriction], 
      'extended_minimum_age': [details.extended_minimum_age],
      'extended_maximum_age': [details.extended_maximum_age],
      'consider_age': [details.consider_age],
      'dependant_minimum_age': [details.dependant_minimum_age],
      'dependant_maximum_age': [details.dependant_maximum_age],
      'dependants': [details.dependants],
      'additional_extended_members': [details.additional_extended_members],
      'additional_extended_consider_age': [details.additional_extended_consider_age], 
      'additional_extended_minimum_age': [details.additional_extended_minimum_age],
      'additional_extended_maximum_age': [details.additional_extended_maximum_age],
      'benefits': [details.benefits],
      'has_benefits': [details.has_benefits],
      'parlour': [details.parlour]
    });
  }
}
