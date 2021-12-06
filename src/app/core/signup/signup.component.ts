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
  submitted = false;

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

    if (!formValue["password"]){
      this.toastr.error("Error", "Password field is required", {timeOut: 3000});
      return;
    }

    if (!formValue["agreed_to_terms"]){
      this.toastr.error("Error", "You must agree to terms to continue.", {timeOut: 3000});
      return;
    }

    this.openService.post(`parlours/signup`, formValue)
      .subscribe(
        (user: any) => {
          const btn = document.getElementById("signUpTriggerModal");
          btn.click();
          this.toastr.success('Parlour was created successfully', '');
          this.submitted = true;
        },
        error => {
          const err = error["error"];
          this.toastr.error(err["description"], err['title']);
        });
  }

}
