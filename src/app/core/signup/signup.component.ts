import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OpenService } from 'src/app/shared/services/open.service';
import { Parlour } from './../parlours/parlours.models';
import { ParlourSignupFormBuilder } from './parlour-signup-form';


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
    console.log(formValue);
    this.openService.post(`parlours/signup`, formValue)
      .subscribe(
        (user: any) => {

        },
        error => {
          console.log("error occured.");
        });
  }

}
