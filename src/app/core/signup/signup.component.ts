import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OpenService } from 'src/app/shared/services/open.service';
import { Parlour } from './../parlours/parlours.models';
import { ParlourSignupFormBuilder } from './parlour-signup-form';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: any;
  formBuilder: ParlourSignupFormBuilder;
  form: FormGroup;
  constructor(public openService: OpenService,
    public router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder) {
      this.formBuilder = new ParlourSignupFormBuilder(fb);
     }

  ngOnInit(): void {
    this.initForm(this.user);
  }

  initForm(parlour: Parlour) {
    this.user = parlour;
    this.form = this.formBuilder.buildForm(this.user);
  }

  postSignUp() {
    const formValue = this.form.value;
    this.openService.post(`parlours/signup`, formValue)
      .subscribe(
        (user: any) => {
          this.toastr.success('Parlour was created successfully', '');
        },
        error => {
          const err = {"description": error["description"], "title": error["title"]};
          this.toastr.error(err['description'], err['title']);
        });
  }

}
