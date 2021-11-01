import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router, Params} from '@angular/router';
import { OpenService } from 'src/app/shared/services/open.service';
import { ForgotPasswordFormBuilder } from './forgot-password-form';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  user: any = null;
  permission: any = null;
  form: FormGroup;
  formBuilder: ForgotPasswordFormBuilder;

  constructor(
    private openservice: OpenService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
    ) { 
      this.formBuilder = new ForgotPasswordFormBuilder(fb);
    }

  ngOnInit(): void {
    this.initForm();
  }

  isConsultant() {
    return this.permission == 'Consultant';
  }

  initForm() {
    this.form = this.formBuilder.buildForm({});
  }

  submit() {
    const formValue = this.form.value

    this.openservice.post(`actions/forgot_password`,formValue)
      .subscribe(
        result => {
          this.showSuccess();
        },
        error => {
          let err = error['error'];
          this.toastr.error(err['description'], error['title'], {timeOut: 3000});
        });
  }

  showSuccess() {
    this.toastr.success('Success', '');
  }
}
