import { FormBuilder, Validators } from '@angular/forms';


export class ResetPasswordFormBuilder {
    constructor(private formBuilder: FormBuilder) {
    }

    buildForm(changePassword) {
      return this.buildResetPasswordForm(changePassword);
    }

    buildResetPasswordForm(details) {
      details = details === undefined ? {"password": null, "confirm_password": null} : details;
      return this.formBuilder.group({
        'password': [details.password, [Validators.required]],
        'confirm_password': [details.confirmPassword, [Validators.required]]
      });
    }
  }
