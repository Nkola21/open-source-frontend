import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpenService } from 'src/app/shared/services/open.service';
import { ToastrService } from 'ngx-toastr';

export class ContactFormBuilder {
  constructor(private formBuilder: FormBuilder) {
  }

  buildForm() {
    return this.buildContactForm();
  }

  buildContactForm() {
    const details =  {'full_name': null, 'email': null, 'message': null}
    return this.formBuilder.group({
      'full_name': [details.full_name, [Validators.required]],
      'email': [details.email, [Validators.required, Validators.email]],
      'message': [details.message, [Validators.required]]
    });
  }
}


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  formBuilder: ContactFormBuilder;
  form: FormGroup;
  contact: any;

  constructor(
    public openService: OpenService,
    private fb: FormBuilder
  ) {
    this.formBuilder = new ContactFormBuilder(fb);
   }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.contact = undefined;
    this.form = this.formBuilder.buildForm();
  }

  submit() {
    const formValue = this.form.value
    this.openService.post('', formValue)
    .subscribe()
  }
}
