import { FormBuilder, Validators } from '@angular/forms';


export class ChangePasswordFormBuilder {
    constructor(private formBuilder: FormBuilder) {
    }

    buildForm(changePassword) {
      return this.buildChangePasswordForm(changePassword);
    }

    buildChangePasswordForm(details) {
      details = details === undefined ? {"password": null, "confirmPassword": null} : details;
      return this.formBuilder.group({
        'password': [details.password, [Validators.required]],
        'confirmPassword': [details.confirmPassword, [Validators.required]]
      });
    }
  }
