import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router, Params} from '@angular/router';
import { OpenService } from 'src/app/shared/services/open.service';


class SignInFormBuilder {
  constructor(private formBuilder: FormBuilder) {
  }

  buildForm(user) {
    return this.buildSignInForm(user);
  }

  buildSignInForm(user) {
    user = {"username": null, "password": null};
    return this.formBuilder.group({
      'username': [user.username, [Validators.required, Validators.minLength(6)]],
      'password': [user.amount, [Validators.required, Validators.minLength(8)]]
    });
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = null;
  form: FormGroup;
  formBuilder: SignInFormBuilder;

  constructor(
    private openservice: OpenService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
    ) { 
      this.formBuilder = new SignInFormBuilder(fb);
    }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.buildForm(this.user);
  }

  handleSignIn(event) {
    let parlour_id = null;
    this.openservice.setUserToken(event.token);
    this.openservice.setUser(event.user);
    console.log(event.permission);
    
    this.openservice.setPermissions(event.permission);
    this.user = event.user;
    if (event.permission == "Parlour") {
      parlour_id = this.user.id
    }else if (event.permission == "Consultant"){
      parlour_id = this.user.parlour.id
    }
    this.openservice.setParlourId(parlour_id)

    this.redirectToView(this.user.id, event.permission)
  }

  redirectToView(user_id, permission) {
    if (permission == 'Parlour'){
      this.redirectToParlourView(user_id);
    }else if (permission == 'Consultant') {
      this.redirectToConsultantView(user_id);
    }else if (permission == 'Admin') {
      this.redirectToAdminView(user_id);
    }
  }

  redirectToParlourView(user_id) {
    const view = [`/parlours/${user_id}/consultants`];
    this.router.navigate(view);
  }

  redirectToConsultantView(user_id) {
    const view = [`/consultants/user_id/applicants`];
    this.router.navigate(view);
  }

  redirectToAdminView(user_id) {
    const view = [`/parlours/${user_id}/consultants`];
    this.router.navigate(view);
  }

  postSignin() {
    const formValue = this.form.value
    this.openservice.post(`parlours/signin`,formValue)
      .subscribe(
        result => {
          console.log(result);
          this.handleSignIn(result)
        },
        error => console.log(error));
  }

  postSigninConsutant(user) {
    this.openservice.post(`consultants/signin`, user )
      .subscribe(
        result => {
          this.handleSignIn(result)
        },
        error => console.log());
  }
}
