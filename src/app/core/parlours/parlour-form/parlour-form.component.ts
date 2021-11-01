import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OpenService } from 'src/app/shared/services/open.service';
import { newParlour, Parlour } from './../parlours.models';
import { ToastrService } from 'ngx-toastr';


export class ParlourFormBuilder {
  constructor(private formBuilder: FormBuilder) {
  }

  buildForm(parlour) {
    return this.buildParlourForm(parlour);
  }

  buildParlourForm(details) {
    details = details === undefined ? newParlour() : details;
    return this.formBuilder.group({
      'id': [details.id],
      'parlour_name': [details.parlour_name, [Validators.required]],
      'person_name': [details.person_name, [Validators.required]],
      'address': [details.address, [Validators.required]],
      'email': [details.email, [Validators.required, Validators.email]],
      'number': [details.number, [Validators.required]],
      'agreed_to_terms': [details.agreed_to_terms],
      'username': [details.username, [Validators.required]],
      'password': [details.password],
      'confirm_password': [details.confirm_password]
    });
  }
}


@Component({
  selector: 'app-parlour-form',
  templateUrl: './parlour-form.component.html',
  styleUrls: ['./parlour-form.component.css']
})
export class ParlourFormComponent implements OnInit  {
  parlour: any;
  submitted = false;
  formBuilder: ParlourFormBuilder;
  form: FormGroup;
  parlour_id: any;
  user: any;

  constructor(public openService: OpenService,
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService) {
      this.formBuilder = new ParlourFormBuilder(fb);
      }

  ngOnInit(): void {
    this.parlour_id = this.openService.getParlourId();
    this.user = this.openService.getUser()
    this.route.params.subscribe(
      (params) => {
        const id = +params['id'];
        if (id){
          this.getParlour(id);
        }else{
          this.initForm(this.parlour);
        }
      }
    )
  }

  initForm(parlour: Parlour) {
    this.parlour = parlour;
    this.form = this.formBuilder.buildForm(this.parlour);
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

  getParlour(id) {
    this.openService.getOne(`parlours/${id}`)
      .subscribe(
        parlour => {
          this.parlour = parlour;
          console.table(parlour)
          this.initForm(this.parlour);
        },
        error => console.log("ERROR"));
  }

  submit() {
    const formValue = this.form.value;
    formValue["parlour_id"] = this.parlour_id;

    if (this.parlour) {
      this.openService.put(`parlours/${this.parlour.id}/update`, formValue)
        .subscribe(
          (user: any) => {
            this.submitted = true;
            this.showSuccess();
          },
        error => {
          let err = error['error'];
          this.toastr.error(err['description'], error['title'], {timeOut: 3000});
        });
    }else {
      if (!formValue["password"]){
        this.toastr.error("Error", "Password field is required", {timeOut: 3000});
        return;
      }

      if (!formValue["agreed_to_terms"]){
        this.toastr.error("Error", "You mst agree to terms to continue.", {timeOut: 3000});
        return;
      }
      this.openService.post(`parlours`, formValue)
        .subscribe(
          (user: any) => {
            this.showSuccess();
            this.submitted = true;
          },
        error => {
          let err = error['error'];
          this.toastr.error(err['description'], error['title'], {timeOut: 3000});
        });
    }
  }

  showSuccess() {
    this.toastr.success('Parlour updated successfully!', '');
  }

  goBack(event) {
    event.preventDefault();
    window.history.back();
  }
  
}
