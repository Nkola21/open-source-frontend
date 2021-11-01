import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';
import { OpenService } from 'src/app/shared/services/open.service';
import { ResetPasswordFormBuilder } from './reset-password-form';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  user: any = null;
  permission: any = null;
  email: any;
  form: FormGroup;
  formBuilder: ResetPasswordFormBuilder;

  constructor(
    private openservice: OpenService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
    ) { 
      this.formBuilder = new ResetPasswordFormBuilder(fb);
    }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      this.email = email;
    });

    this.permission = this.openservice.getPermissions();
    this.user = this.openservice.getUser();
    this.initForm();
  }

  isConsultant() {
    return this.permission == 'Consultant';
  }

  initForm() {
    this.form = this.formBuilder.buildForm({});

    const confirmed_password: FormControl = (<FormControl>this.form.controls['confirm_password']);

    this.form.controls['password'].valueChanges.subscribe(value => {
      confirmed_password.setValue('');
      confirmed_password.markAsDirty();
      confirmed_password.setErrors({ 'validateConfirmPassword': true });
    });

    this.form.controls['confirm_password'].valueChanges.subscribe(value => {
      if (value !== this.form.controls['password'].value) {
        confirmed_password.setErrors({ 'validateConfirmPassword': true });
      }
    });
  }

  submit() {
    const formValue = this.form.value
    formValue["email"] = this.email;

    this.openservice.post(`actions/reset_password`, formValue)
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
