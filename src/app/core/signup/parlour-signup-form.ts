import { FormBuilder, Validators } from '@angular/forms';
import { newParlour } from './../parlours/parlours.models';


export class ParlourSignupFormBuilder {
    constructor(private formBuilder: FormBuilder) {
    }
  
    buildForm(parlour) {
      return this.buildParlourSignupForm(parlour);
    }
  
    buildParlourSignupForm(details) {
      details = details === undefined ? newParlour() : details;
      return this.formBuilder.group({
        'id': [details.id],
        'parlour_name': [details.parlour_name, [Validators.required]],
        'address': [details.address, [Validators.required]],
        'person_name': [details.person_name, [Validators.required]],
        'number': [details.number, [Validators.required]],
        'email': [details.email, [Validators.required]],
        'username': [details.username, [Validators.required]],
        'password': [details.password, [Validators.required]],
        'confirm_password': [details.confirm_password, [Validators.required]],
        'agreed_to_terms': [details.agreed_to_terms, [Validators.required]]
      });
    }
  }
