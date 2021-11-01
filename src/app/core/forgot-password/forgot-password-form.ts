import { FormBuilder, Validators } from '@angular/forms';


export class ForgotPasswordFormBuilder {
    constructor(private formBuilder: FormBuilder) {
    }

    buildForm(forgotPassword) {
      return this.buildForgotPasswordForm(forgotPassword);
    }

    buildForgotPasswordForm(details) {
      details = details === undefined ? {"email": null} : details;
      return this.formBuilder.group({
        'email': [details.password, [Validators.required, Validators.email]]
      });
    }
  }
