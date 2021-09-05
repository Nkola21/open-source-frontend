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
        'parlour_name': [details.parlour_name, [Validators.required, Validators.minLength(6)]],
        'address': [details.address, [Validators.required, Validators.minLength(6)]],
        'person_name': [details.person_name, [Validators.required, Validators.minLength(6)]],
        'number': [details.number, [Validators.required, Validators.minLength(10)]],
        'email': [details.email, [Validators.required]],
        'username': [details.username, [Validators.required, Validators.minLength(6)]],
        'password': [details.password, [Validators.required, Validators.minLength(8)]],
        'confirm_password': [details.confirm_password, [Validators.required, , Validators.minLength(6)]]
      });
    }
  }
