import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
        'parlour_name': [details.name, [Validators.required, Validators.minLength(6)]],
        'address': [details.name, [Validators.required, Validators.minLength(6)]],
        'person_name': [details.notes, [Validators.required, Validators.minLength(6)]],
        'number': [details.amount, [Validators.required, Validators.minLength(10)]],
        'email': [details.email, [Validators.required]],
        'username': [details.email, [Validators.required, Validators.minLength(6)]],
        'password': [details.amount, [Validators.required, Validators.minLength(8)]],
        'confirm_password': [details.amount, [Validators.required, , Validators.minLength(6)]]
      });
    }
  }