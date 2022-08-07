import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router, Params} from '@angular/router';
import { OpenService, CommonService } from 'src/app/shared/services/open.service';
import { ChangePasswordFormBuilder } from './change-password-form';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  user: any = null;
  permission: any = null;
  form: FormGroup;
  formBuilder: ChangePasswordFormBuilder;

  constructor(
    private openservice: OpenService,
    private service: CommonService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
    ) { 
      this.formBuilder = new ChangePasswordFormBuilder(fb);
    }

  ngOnInit(): void {
    this.permission = this.openservice.getPermissions();
    this.user = this.openservice.getUser();
    this.transition(this.user);
    this.initForm();
  }

  transition(user: any) {
    this.service.switchHeader(user);
  }

  isConsultant() {
    return this.permission == 'Consultant';
  }

  initForm() {
    this.form = this.formBuilder.buildForm({});
  }

  postChangePassword() {
    const formValue = this.form.value

    this.openservice.put(`consultants/${this.user.id}/change_password`,formValue)
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
