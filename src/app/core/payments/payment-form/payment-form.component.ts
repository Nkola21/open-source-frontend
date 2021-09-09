import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OpenService } from 'src/app/shared/services/open.service';
import { PaymentFormBuilder } from '../payment-form-builder';


@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  payment: any;
  formBuilder: PaymentFormBuilder;
  form: FormGroup;

  constructor(public openService: OpenService,
    public router: Router,
    private fb: FormBuilder) {
      this.formBuilder = new PaymentFormBuilder(fb);
  }

  ngOnInit(): void {

    this.initForm(this.payment);
  }

  initForm(payment) {
    this.payment = payment;
    this.form = this.formBuilder.buildForm(this.payment);
  }

  submit() {
    const formValue = this.form.value;
    console.log(formValue);
    if (this.payment) {
      this.openService.put(`payments/${this.payment.id}/update`, formValue)
        .subscribe(
          (payment: any) => {
  
          },
        error => {
            console.log(error);
        });
    }else {
      this.openService.post(`payments`, formValue)
        .subscribe(
          (payment: any) => {

          },
        error => {
            console.log(error);
        });
    }
  }
}
