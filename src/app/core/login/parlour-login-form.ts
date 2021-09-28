import { FormBuilder, Validators } from '@angular/forms';
import { login } from './login.models';


export class LoginFormBuilder {
    constructor(private formBuilder: FormBuilder) {
    }
  
    buildForm(login) {
      return this.buildParlourLoginForm(login);
    }
  
    buildParlourLoginForm(details) {
      details = details === undefined ? login() : details;
      return this.formBuilder.group({
        'email': [details.name, [Validators.required]],
        'password': [details.name, [Validators.required]]
      });
    }
  }